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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderServices = void 0;
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
const user_model_1 = __importDefault(require("../user/user.model"));
const order_utils_1 = require("./order.utils");
const createOrder = (payload, client_ip, signUser) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, quantity } = payload;
    const user = yield user_model_1.default.findOne({ email: signUser.email });
    const { email, name } = user;
    // console.log(email);
    const product = yield product_model_1.ProductModel.findById(productId);
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
    yield product.save();
    const totalPrice = product.price * quantity;
    const order = yield order_model_1.orderModel.create({
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
    yield order_utils_1.orderUtils.makePayment(shurjopayPayload);
    console.log(shurjopayPayload);
    return { order };
});
const getOrder = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.orderModel.find();
    return result;
});
const getOwnOrder = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.orderModel.find({ email: email });
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
    getOwnOrder,
    getOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
};
