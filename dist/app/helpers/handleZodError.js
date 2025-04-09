"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = void 0;
const handleZodError = (err, res) => {
    res.status(400).json({
        status: false,
        message: err.errors,
        error: err
    });
};
exports.handleZodError = handleZodError;
