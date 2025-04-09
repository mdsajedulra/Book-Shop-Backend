/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { orderServices } from './order.service';

const createOrder = catchAsync(async (req, res, _next) => {
  const payload = req.body;
  const result = await orderServices.createOrder(payload, req.ip!);
  sendResponse(res, {
    message: 'order created successfully',
    statudeCode: StatusCodes.CREATED,
    success: true,
    data: result,
  });
});

const getOrders = catchAsync(async (_req, res, _next) => {
  const result = await orderServices.getOrder();
  sendResponse(res, {
    message: 'order fetched successfully',
    statudeCode: StatusCodes.OK,
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
    statudeCode: StatusCodes.OK,
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
    statudeCode: StatusCodes.OK,
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
    statudeCode: StatusCodes.OK,
    success: true,
    data: result,
  });
});

export const orderController = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
