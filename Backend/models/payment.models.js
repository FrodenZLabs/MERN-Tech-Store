import mongoose, { Schema } from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    authId: {
      type: Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        repayment_plan: {
          type: Number,
          enum: [3, 6, 9, 12], // Allowed repayment plans (in months)
          default: 3,
        },
      },
    ],
    total_price: {
      type: Number,
      required: true,
    }, // Original total price of all items
    remaining_balance: {
      type: Number,
      required: true,
    }, // Tracks remaining amount across all items
    payment_status: {
      type: String,
      enum: ["pending", "completed", "failed", "partially_paid"],
      default: "pending",
    },
    payments: [
      {
        amount: { type: Number, required: true },
        date: { type: Date, default: Date.now },
        status: {
          type: String,
          enum: ["pending", "completed", "failed"],
          default: "pending",
        },
        transaction_id: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
