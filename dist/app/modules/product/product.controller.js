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
exports.productController = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const product_service_1 = require("./product.service");
const createProduct = (0, catchAsync_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield product_service_1.productServices.createProduct(payload);
    (0, sendResponse_1.default)(res, {
        message: "product create Seccussfully",
        statudeCode: http_status_codes_1.StatusCodes.CREATED,
        success: true,
        data: result,
    });
}));
const getProduct = (0, catchAsync_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const searchTerm = req.query;
    const result = yield product_service_1.productServices.getProduct(searchTerm);
    (0, sendResponse_1.default)(res, {
        message: "product fetch Seccussfully",
        statudeCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
}));
const getSpecificProduct = (0, catchAsync_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield product_service_1.productServices.getSpecificProduct(id);
    (0, sendResponse_1.default)(res, {
        message: "product fetch Seccussfully",
        statudeCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
}));
// delete product
const deleteProduct = (0, catchAsync_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield product_service_1.productServices.deleteProduct(id);
    (0, sendResponse_1.default)(res, {
        message: "product deleted Seccussfully",
        statudeCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
}));
// update product by id
const updateProduct = (0, catchAsync_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const result = yield product_service_1.productServices.updateProduct(id, payload);
    (0, sendResponse_1.default)(res, {
        message: "product updated Seccussfully",
        statudeCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
}));
exports.productController = {
    createProduct,
    getProduct,
    getSpecificProduct,
    deleteProduct,
    updateProduct
};
