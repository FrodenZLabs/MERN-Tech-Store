import Payment from "../models/payment.models.js";
import Product from "../models/products.models.js";
import { errorHandler } from "../utils/errorHandler.js";
import stripe from "../utils/stripe.js";

export const createPayment = async (request, response, next) => {
  try {
    const { items, monthlyInstallment, total_price } = request.body;
    const authId = request.user.id;

    // Validate input fields
    if (!items || !total_price) {
      return next(errorHandler(400, "All fields are required."));
    }

    if (isNaN(total_price) || total_price <= 0) {
      return next(errorHandler(400, "Total price must be a positive number."));
    }

    // Validate each item in the cart
    for (const item of items) {
      const { productId, quantity, price, repayment_plan } = item;

      if (!productId || !quantity || !price || !repayment_plan) {
        return next(errorHandler(400, "Invalid cart item data."));
      }

      if (isNaN(quantity) || quantity <= 0 || isNaN(price) || price <= 0) {
        return next(
          errorHandler(400, "Invalid quantity or price for a cart item.")
        );
      }

      if (![3, 6, 9, 12].includes(repayment_plan)) {
        return next(
          errorHandler(400, `Invalid repayment plan: ${repayment_plan}`)
        );
      }

      // Verify product exists
      const product = await Product.findById(productId);
      if (!product) {
        return next(errorHandler(404, `Product ${productId} not found.`));
      }

      if (product.stock < item.quantity) {
        return next(
          errorHandler(400, `Insufficient stock for product: ${product.title}`)
        );
      }
    }

    // Deduct stock levels for all products
    for (const item of items) {
      const product = await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: -item.quantity } }, // Deduct stock based on quantity
        { new: true } // Return the updated product document
      );

      if (!product || product.stock < 0) {
        return next(errorHandler(400, "Failed to update stock levels."));
      }
    }

    // Convert total price to cents for Stripe
    const totalAmountInCents = Math.round(monthlyInstallment * 100);

    // Create a payment intent with Stripe
    let paymentIntent;
    try {
      paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmountInCents, // Stripe works in cents
        currency: "kes", // Use "usd" if "kes" is not supported
        metadata: { authId },
      });
    } catch (stripeError) {
      console.error("Stripe payment intent creation failed:", stripeError);
      return next(errorHandler(500, "Failed to create Stripe payment intent."));
    }

    // Prepare payment data for saving in the database
    const paymentItems = items.map((item) => {
      const totalPriceForItem = item.price * item.quantity; // Total price for the item
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        repayment_plan: item.repayment_plan, // Include repayment plan
        total_price: totalPriceForItem, // Total price for the item
        remaining_balance: totalPriceForItem - monthlyInstallment, // Deduct first installment
      };
    });

    // Calculate overall totals
    const totalRemainingBalance = paymentItems.reduce(
      (sum, item) => sum + item.remaining_balance,
      0
    );

    // Determine payment status
    const paymentStatus =
      totalRemainingBalance === 0 ? "fully_paid" : "partially_paid";

    // Create a new payment record
    const payment = new Payment({
      authId,
      items: paymentItems,
      total_price,
      remaining_balance: totalRemainingBalance, // Remaining balance after first installment
      payment_status: paymentStatus,
      payments: [
        {
          amount: monthlyInstallment, // First installment
          date: new Date(),
          status: "completed",
          transaction_id: paymentIntent.id,
        },
      ],
    });

    // Save the payment record
    await payment.save();

    response.status(201).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      message: "First installment recorded successfully.",
      remaining_balance: totalRemainingBalance,
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    next(errorHandler(500, "Error processing payment."));
  }
};
