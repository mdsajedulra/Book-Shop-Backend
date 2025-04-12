"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const product_validation_1 = require("./product.validation");
const product_controller_1 = require("./product.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const multer_1 = __importDefault(require("multer"));
const productRoute = (0, express_1.Router)();
const upload = (0, multer_1.default)();
//post to create product
productRoute.post('/', (0, validateRequest_1.default)(product_validation_1.ProductValidationSchema), (0, auth_1.default)('admin'), product_controller_1.productController.createProduct);
productRoute.get('/', product_controller_1.productController.getProduct); //patch to get all products
productRoute.get('/:id', product_controller_1.productController.getSpecificProduct); //patch to get specific product
productRoute.delete('/:id', (0, auth_1.default)('admin'), product_controller_1.productController.deleteProduct); //patch to delete specific product
productRoute.patch('/:id', (0, auth_1.default)('admin'), product_controller_1.productController.updateProduct); //patch to delete specific product
exports.default = productRoute;
