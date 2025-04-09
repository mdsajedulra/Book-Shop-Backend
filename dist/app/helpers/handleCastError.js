"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCastError = void 0;
const handleCastError = (err, res) => {
    res.status(400).json({ success: false, message: err.message, error: err });
};
exports.handleCastError = handleCastError;
