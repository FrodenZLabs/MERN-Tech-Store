import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import predictionRoutes from "./routes/prediction.route.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/product.route.js";
import paymentRoutes from "./routes/payment.route.js";
import userRoutes from "./routes/user.route.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((error) => {
    console.log(error);
  });

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/Frontend/dist")));

// Server port
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/prediction", predictionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Middleware
app.use((error, request, response, next) => {
  const statusCode = error.statusCode || 500;
  const errorMessage = error.message || "Internal Server Error";
  response.status(statusCode).json({
    success: false,
    statusCode,
    errorMessage,
  });
});
