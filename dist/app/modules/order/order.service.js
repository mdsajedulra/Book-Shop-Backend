"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderServices = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
// import { orderUtils } from "./order.utils";
const createOrder = (payload, client_ip) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const { email, productId, quantity } = payload;
    const product = yield product_model_1.ProductModel.findById(productId);
    // console.log(product);
    if (!product) {
        throw new Error("Product not found");
    }
    if (product.quantity < quantity) {
        throw new Error("Stock not available");
    }
    product.quantity -= quantity;
    console.log(product);
    if (product.quantity === 0) {
        product.inStock = false;
    }
    yield product.save();
    const totalPrice = product.price * quantity;
    const order = yield order_model_1.orderModel.create({
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
    //   customer_address:"Mohakhali",
    //   customer_email: "mdsajedulra@gmail.com",
    //   customer_phone:   "01780941957",
    //   customer_city: "Natore",
    //   client_ip,
    // }
    // const payment =  await orderUtils.makePayment(shurjopayPayload)
    return { order };
});
const getOrder = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.orderModel.find();
    return result;
});
const getOrderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.orderModel.findById(id);
    return result;
});
const updateOrder = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.orderModel.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
const deleteOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.orderModel.findByIdAndDelete(id);
    return result;
});
exports.orderServices = {
    createOrder,
    getOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
};
