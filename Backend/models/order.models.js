import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    authId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
        repayment_plan: {
          type: Number,
          enum: [3, 6, 9, 12], // Allowed repayment plans in months
          required: true,
        },
        total_price: {
          type: Number,
          required: true, // Total price for the item (quantity * price)
        },
        remaining_balance: {
          type: Number,
          required: true, // Remaining balance after deposit or installments
        },
        monthly_installment: {
          type: Number,
          required: true, // Monthly installment amount
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true, // Total amount for the entire order
    },
    remainingBalance: {
      type: Number,
      required: true, // Remaining balance for the entire order
    },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered"],
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      enum: ["Unpaid", "partially_paid", "fully_paid"], // Include "Partially Paid" for installments
      default: "Unpaid",
    },
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment", // Reference to the associated payment record
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
