"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    res.status(res.statusCode).json({
        success: data.success,
        message: data.message,
        statusCode: res.statusCode,
        data: data.data,
    });
};
exports.default = sendResponse;
