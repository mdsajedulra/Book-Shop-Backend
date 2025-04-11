"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const order_validation_1 = require("./order.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const orderRoutes = (0, express_1.Router)();
orderRoutes.get('/verify', order_controller_1.orderController.verifyPayment);
orderRoutes.post('/', (0, auth_1.default)('user', 'admin'), (0, validateRequest_1.default)(order_validation_1.orderValidationSchema), order_controller_1.orderController.createOrder);
orderRoutes.get('/', (0, auth_1.default)('admin'), order_controller_1.orderController.getOrders);
orderRoutes.get('/own_order', (0, auth_1.default)('user'), order_controller_1.orderController.getOwnOrder);
orderRoutes.get('/:id', (0, auth_1.default)('admin'), order_controller_1.orderController.getOrderById);
orderRoutes.put('/:id', (0, auth_1.default)('admin'), order_controller_1.orderController.updateOrder);
orderRoutes.delete('/:id', order_controller_1.orderController.deleteOrder);
exports.default = orderRoutes;
