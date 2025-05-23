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
exports.orderController = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const order_service_1 = require("./order.service");
const createOrder = (0, catchAsync_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield order_service_1.orderServices.createOrder(payload, req.ip, req.user);
    (0, sendResponse_1.default)(res, {
        message: 'order created successfully',
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        success: true,
        data: result,
    });
}));
const verifyPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.query);
    const order = yield order_service_1.orderServices.verifyPayment(req.query.order_id);
    (0, sendResponse_1.default)(res, {
        message: 'Order verified successfully',
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        success: true,
        data: order,
    });
}));
const getOrders = (0, catchAsync_1.default)((_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.orderServices.getOrder();
    (0, sendResponse_1.default)(res, {
        message: 'order fetched successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
}));
const getOwnOrder = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.user;
    const result = yield order_service_1.orderServices.getOwnOrder(email);
    (0, sendResponse_1.default)(res, {
        message: 'order fetch uccessfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
}));
// get order by id
const getOrderById = (0, catchAsync_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield order_service_1.orderServices.getOrderById(id);
    (0, sendResponse_1.default)(res, {
        message: 'order fetched successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
}));
// update order by id
const updateOrder = (0, catchAsync_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const result = yield order_service_1.orderServices.updateOrder(id, payload);
    (0, sendResponse_1.default)(res, {
        message: 'order updated successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
}));
// delete order by id
const deleteOrder = (0, catchAsync_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield order_service_1.orderServices.deleteOrder(id);
    (0, sendResponse_1.default)(res, {
        message: 'order deleted successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
}));
exports.orderController = {
    verifyPayment,
    createOrder,
    getOwnOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
};
