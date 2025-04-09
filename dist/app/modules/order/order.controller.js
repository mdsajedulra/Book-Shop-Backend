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
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const order_service_1 = require("./order.service");
const createOrder = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield order_service_1.orderServices.createOrder(payload, req.ip);
    (0, sendResponse_1.default)(res, {
        message: "order created successfully",
        statudeCode: http_status_codes_1.StatusCodes.CREATED,
        success: true,
        data: result,
    });
}));
const getOrders = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.orderServices.getOrder();
    (0, sendResponse_1.default)(res, {
        message: "order fetched successfully",
        statudeCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
}));
// get order by id 
const getOrderById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield order_service_1.orderServices.getOrderById(id);
    (0, sendResponse_1.default)(res, {
        message: "order fetched successfully",
        statudeCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
}));
// update order by id
const updateOrder = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const result = yield order_service_1.orderServices.updateOrder(id, payload);
    (0, sendResponse_1.default)(res, {
        message: "order updated successfully",
        statudeCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
}));
// delete order by id
const deleteOrder = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield order_service_1.orderServices.deleteOrder(id);
    (0, sendResponse_1.default)(res, {
        message: "order deleted successfully",
        statudeCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
}));
exports.orderController = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder
};
