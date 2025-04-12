/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { orderServices } from './order.service';
import { verifyToken } from '../auth/auth.utils';

const createOrder = catchAsync(async (req, res, _next) => {
  const payload = req.body;
  const result = await orderServices.createOrder(payload, req.ip!, req.user);
  sendResponse(res, {
    message: 'order created successfully',
    statusCode: StatusCodes.CREATED,
    success: true,
    data: result,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  // console.log(req.query);
  const order = await orderServices.verifyPayment(
    req.query.order_id as string,
  );
  sendResponse(res, {
    message: 'Order verified successfully',
    statusCode: StatusCodes.CREATED,
    success: true,
    data: order,
  });
});

const getOrders = catchAsync(async (_req, res, _next) => {
  const result = await orderServices.getOrder();
  sendResponse(res, {
    message: 'order fetched successfully',
    statusCode: StatusCodes.OK,
    success: true,
    data: result,
  });
});

const getOwnOrder = catchAsync(async (req, res, next) => {
  const { email } = req.user;
  const result = await orderServices.getOwnOrder(email);
  sendResponse(res, {
    message: 'order fetch uccessfully',
    statusCode: StatusCodes.OK,
    success: true,
    data: result,
  });
});

// get order by id

const getOrderById = catchAsync(async (req, res, _next) => {
  const { id } = req.params;
  const result = await orderServices.getOrderById(id);
  sendResponse(res, {
    message: 'order fetched successfully',
    statusCode: StatusCodes.OK,
    success: true,
    data: result,
  });
});

// update order by id

const updateOrder = catchAsync(async (req, res, _next) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await orderServices.updateOrder(id, payload);
  sendResponse(res, {
    message: 'order updated successfully',
    statusCode: StatusCodes.OK,
    success: true,
    data: result,
  });
});

// delete order by id

const deleteOrder = catchAsync(async (req, res, _next) => {
  const { id } = req.params;
  const result = await orderServices.deleteOrder(id);
  sendResponse(res, {
    message: 'order deleted successfully',
    statusCode: StatusCodes.OK,
    success: true,
    data: result,
  });
});

export const orderController = {
  verifyPayment,
  createOrder,
  getOwnOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
