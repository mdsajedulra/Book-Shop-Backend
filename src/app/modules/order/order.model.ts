import mongoose, { Schema } from 'mongoose';
import { IOrder } from './order.interface';

const orderSchema = new Schema<IOrder>(
  {
    email: { type: String, required: true },
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    transaction: {
      id: { type: String },
      transactionStatus: { type: String },
      bank_status: {type: String},
      sp_code: { type: String },
      sp_message: { type: String },
      method: { type: String },
      date_time: { type: String },
    },
  },
  { timestamps: true },
);

export const orderModel = mongoose.model<IOrder>('Order', orderSchema);
