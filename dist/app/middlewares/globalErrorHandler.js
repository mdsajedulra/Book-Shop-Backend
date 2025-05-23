"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const handleCastError_1 = require("../helpers/handleCastError");
const handleValidationError_1 = require("../helpers/handleValidationError");
const handleDuplicateError_1 = require("../helpers/handleDuplicateError");
const handleGenericError_1 = require("../helpers/handleGenericError");
const handleZodError_1 = require("../helpers/handleZodError");
const http_status_codes_1 = require("http-status-codes");
const globalErrorHandler = (err, req, res, next) => {
    var _a;
    if (err.name && err.name === 'ZodError') {
        (0, handleZodError_1.handleZodError)(err, res);
    }
    else if (err instanceof mongoose_1.default.Error.CastError) {
        (0, handleCastError_1.handleCastError)(err, res);
    }
    else if (err instanceof mongoose_1.default.Error.ValidationError) {
        (0, handleValidationError_1.handleValidationError)(err, res);
    }
    else if (err.code && err.code === 11000) {
        if (err.code === 11000 && ((_a = err.keyPattern) === null || _a === void 0 ? void 0 : _a.email)) {
            res.status(http_status_codes_1.StatusCodes.CONFLICT).json({
                status: false,
                message: 'Email is already registered',
                error: err,
            });
        }
        (0, handleDuplicateError_1.handleDuplicateError)(err, res);
    }
    else if (err instanceof Error) {
        (0, handleGenericError_1.handleGenericError)(err, res);
    }
    res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: 'Something went wrong',
        error: err,
    });
    next();
};
exports.globalErrorHandler = globalErrorHandler;
