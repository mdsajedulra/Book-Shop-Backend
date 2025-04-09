"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
const http_status_codes_1 = require("http-status-codes");
const handleValidationError = (err, res) => {
    res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
        status: false,
        message: err.message,
        error: err,
    });
};
exports.handleValidationError = handleValidationError;
