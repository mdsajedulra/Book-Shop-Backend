/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { handleCastError } from '../helpers/handleCastError';
import { handleValidationError } from '../helpers/handleValidationError';
import { handleDuplicateError } from '../helpers/handleDuplicateError';
import { handleGenericError } from '../helpers/handleGenericError';
import { handleZodError } from '../helpers/handleZodError';
import { StatusCodes } from 'http-status-codes';

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.name && err.name === 'ZodError') {
    handleZodError(err, res);
  } else if (err instanceof mongoose.Error.CastError) {
    handleCastError(err, res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    handleValidationError(err, res);
  } else if (err.code && err.code === 11000) {
    if (err.code === 11000 && err.keyPattern?.email) {
      res.status(StatusCodes.CONFLICT).json({
        status: false,
        message: 'Email is already registered',
        error: err,
      });
    }
    handleDuplicateError(err, res);
  } else if (err instanceof Error) {
    handleGenericError(err, res);
  }
  next();
};
