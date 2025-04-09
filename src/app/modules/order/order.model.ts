import mongoose, { Schema } from "mongoose";
import { IOrder } from "./order.interface";

 const orderSchema = new Schema<IOrder>(
  {
    email: { type: String, required: true },
    productId: { type: String, required: true }, 
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true }
  },
  { timestamps: true }
);

  export const orderModel = mongoose.model<IOrder>("Order", orderSchema);