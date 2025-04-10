import { ProductModel } from '../product/product.model';
import { IOrder } from './order.interface';
import { orderModel } from './order.model';
// import { orderUtils } from "./order.utils";

const createOrder = async (payload: IOrder, client_ip: string) => {
  console.log(payload);
  const { email, productId, quantity } = payload;
  const product = await ProductModel.findById(productId);
  // console.log(product);
  if (!product) {
    throw new Error('Product not found');
  }
  if (product.quantity < quantity) {
    throw new Error('Stock not available');
  }
  product.quantity -= quantity;
  console.log(product);
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

  // const shurjopayPayload = {
  //   amount: totalPrice,
  //   order_id: order._id,
  //   currency: "BDT",
  //   customer_name: "Md Sajedul Islam",
  //   customer_address: "Mohakhali",
  //   customer_email: "mdsajedulra@gmail.com",
  //   customer_phone: "01780941957",
  //   customer_city: "Natore",
  //   client_ip,
  // };
  // const payment = await orderUtils.makePayment(shurjopayPayload);

  // console.log(payment);

  return { order };
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
  const result = await orderModel.findById(id);
  return result;
};

const updateOrder = async (id: string, payload: IOrder) => {
  const result = await orderModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteOrder = async (id: string) => {
  const result = await orderModel.findByIdAndDelete(id);
  return result;
};

export const orderServices = {
  createOrder,
  getOwnOrder,
  getOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
};
