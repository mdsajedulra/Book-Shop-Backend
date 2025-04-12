/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { productServices } from './product.service';

const createProduct = catchAsync(async (req, res, _next) => {
  const payload = req.body;
  const result = await productServices.createProduct(payload);

  sendResponse(res, {
    message: 'product create Seccussfully',
    statusCode: StatusCodes.CREATED,
    success: true,
    data: result,
  });
});

const getProduct = catchAsync(async (req, res, _next) => {
  const searchTerm = req.query;
  const result = await productServices.getProduct(searchTerm);
  sendResponse(res, {
    message: 'product fetch Seccussfully',
    statusCode: StatusCodes.OK,
    success: true,
    data: result,
  });
});

const getSpecificProduct = catchAsync(async (req, res, _next) => {
  const { id } = req.params;
  const result = await productServices.getSpecificProduct(id);
  sendResponse(res, {
    message: 'product fetch Seccussfully',
    statusCode: StatusCodes.OK,
    success: true,
    data: result,
  });
});

// delete product
const deleteProduct = catchAsync(async (req, res, _next) => {
  const { id } = req.params;
  const result = await productServices.deleteProduct(id);
  sendResponse(res, {
    message: 'product deleted Seccussfully',
    statusCode: StatusCodes.OK,
    success: true,
    data: result,
  });
});
// update product by id
const updateProduct = catchAsync(async (req, res, _next) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await productServices.updateProduct(id, payload);
  sendResponse(res, {
    message: 'product updated Seccussfully',
    statusCode: StatusCodes.OK,
    success: true,
    data: result,
  });
});

export const productController = {
  createProduct,
  getProduct,
  getSpecificProduct,
  deleteProduct,
  updateProduct,
};
