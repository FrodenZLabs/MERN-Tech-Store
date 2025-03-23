import Payment from "../models/payment.models.js";
import { Product } from "../models/products.models.js";
import { errorHandler } from "../utils/errorHandler.js";
import stripe from "../utils/stripe.js";
import dotenv from "dotenv";
dotenv.config();

export const createPayment = async (request, response, next) => {
  try {
    const { user_id, product_id, payment_amount } = request.body;

    // Validate input fields
    if (!user_id || !product_id || !payment_amount) {
      return next(errorHandler(400, "All fields are required."));
    }
    if (isNaN(payment_amount) || payment_amount <= 0) {
      return next(
        errorHandler(400, "Payment amount must be a positive number.")
      );
    }

    // Get the product price
    const product = await Product.findById(product_id);
    if (!product) return next(errorHandler(404, "Product not found"));

    // Check if user already has an active payment plan
    let payment = await Payment.findOne({ user_id, product_id });

    if (!payment) {
      // If no existing plan, create a new one
      payment = new Payment({
        user_id,
        product_id,
        total_price: product.base_price,
        remaining_balance: product.base_price, // Initially, full price is due
        payments: [],
        payment_status: "pending",
        payment_amount, // Ensure payment_amount is included at the root level
        payment_date: new Date(), // Ensure payment_date is set
      });
    }

    // Check if the amount is valid
    if (payment_amount > payment.remaining_balance) {
      return next(errorHandler(400, "Payment exceeds remaining balance"));
    }

    // Convert payment amount to cents (Fix applied here)
    const amountInCents = Math.round(payment_amount * 100);

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents, // Stripe works in cents
      currency: "kes",
      metadata: { user_id, product_id },
    });

    // Add the payment entry to the history
    payment.payments.push({
      amount: payment_amount,
      date: new Date(),
      status: "completed",
      transaction_id: paymentIntent.id,
    });

    // Deduct from the remaining balance
    payment.remaining_balance -= payment_amount;
    payment.payment_status = payment.remaining_balance > 0 ? "pending" : "paid";
    payment.payment_date = new Date();

    // Check if fully paid
    if (payment.remaining_balance <= 0) {
      payment.payment_status = "paid"; // Mark as fully paid
    }

    // Save updated payment record
    await payment.save();

    console.log(
      `✅ Payment of ${payment_amount} KES recorded for User ${user_id}`
    );

    response.status(201).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      message: "Payment successful and recorded.",
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    next(errorHandler(500, "Error processing payment."));
  }
};

export const stripeWebhook = async (request, response, next) => {
  try {
    const sig = request.headers["stripe-signature"];

    let event;
    try {
      // Verify the Stripe event
      event = stripe.webhooks.constructEvent(
        request.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return next(errorHandler(400, "Webhook error: Invalid signature"));
    }

    // Handle successful payment
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      const { user_id, product_id } = paymentIntent.metadata;
      const amountPaid = paymentIntent.amount / 100; // Convert from cents to KES

      // Find the existing payment record
      let payment = await Payment.findOne({ user_id, product_id });

      if (!payment) {
        return next(errorHandler(404, "Payment record not found"));
      }

      // Add the payment entry to the history
      payment.payments.push({
        amount: amountPaid,
        date: new Date(),
        status: "completed",
        transaction_id: paymentIntent.id,
      });

      // Deduct from the remaining balance
      payment.remaining_balance -= amountPaid;

      // Check if fully paid
      if (payment.remaining_balance <= 0) {
        payment.payment_status = "paid"; // Mark as fully paid
      }

      // Save updated payment record
      await payment.save();

      console.log(
        `✅ Payment of ${amountPaid} KES recorded for User ${user_id}`
      );

      return response
        .status(200)
        .json({ success: true, message: "Payment recorded successfully" });
    }

    response.status(200).json({ success: true });
  } catch (error) {
    console.error("Webhook handling error:", error);
    next(errorHandler(500, "Error handling webhook"));
  }
};
