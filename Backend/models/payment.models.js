import mongoose, { Schema } from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    total_price: {
      type: Number,
      required: true,
    }, // Original total price
    remaining_balance: {
      type: Number,
      required: true,
    }, // Tracks remaining amount
    payment_date: {
      type: Date,
      required: true,
    },
    payment_amount: {
      type: Number,
      required: true,
    },
    payment_status: {
      type: String,
      required: true,
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
