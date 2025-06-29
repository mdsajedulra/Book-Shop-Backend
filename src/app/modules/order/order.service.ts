import { JwtPayload } from 'jsonwebtoken';
import { ProductModel } from '../product/product.model';
import { IOrder } from './order.interface';
import { orderModel } from './order.model';
import User from '../user/user.model';
import { IUser } from '../user/user.interface';
import { orderUtils } from './order.utils';

const createOrder = async (
  payload: IOrder,
  client_ip: string,
  signUser: JwtPayload,
) => {
  const { productId, quantity } = payload;

  const user = await User.findOne({ email: signUser.email });

  const { email, name } = user as IUser;
  // console.log(email);

  const product = await ProductModel.findById(productId);
  // console.log(product);
  if (!product) {
    throw new Error('Product not found');
  }
  if (product.quantity < quantity) {
    throw new Error('Stock not available');
  }
  product.quantity -= quantity;
  // console.log(product);
  if (product.quantity === 0) {
    product.inStock = false;
  }

  await product.save();

  const totalPrice = product.price * quantity;
  const order = await orderModel.create({
    email,
    productId,
    totalPrice,
    quantity,
  });

  // shurjo pay payment integration

  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: 'BDT',
    customer_name: name,
    customer_address: 'Mohakhali',
    customer_email: email,
    customer_phone: '01780941957',
    customer_city: 'Natore',
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  await orderModel.findByIdAndUpdate(
    order._id,
    {
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    },
    { new: true },
  )!;

  return payment.checkout_url;
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);
  if (verifiedPayment.length) {
    await orderModel.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.transectionStatus': verifiedPayment[0].transaction_status,
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );
  }
  return verifiedPayment;
};

const getOrder = async () => {
  const result = await orderModel.find();
  return result;
};

const getOwnOrder = async (email: string) => {
  const result = await orderModel.find({ email: email });
  return result;
};

const getOrderById = async (id: string) => {
  const result = await orderModel.findById(id ,{new: true});
  return result;
};

const updateOrder = async (id: string, payload: IOrder) => {
  const result = await orderModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteOrder = async (id: string) => {
  const result = await orderModel.findByIdAndDelete(id, {new: true});
  return result;
};

export const orderServices = {
  verifyPayment,
  createOrder,
  getOwnOrder,
  getOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
};
