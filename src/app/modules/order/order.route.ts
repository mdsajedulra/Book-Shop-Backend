import { Router } from 'express';
import { orderController } from './order.controller';
import validateRequest from '../../middlewares/validateRequest';
import { orderValidationSchema } from './order.validation';
import auth from '../../middlewares/auth';

const orderRoutes = Router();

orderRoutes.post(
  '/',
  auth('user'),
  validateRequest(orderValidationSchema),
  orderController.createOrder,
);

orderRoutes.get('/', auth('admin'), orderController.getOrders);

orderRoutes.get('/:id', orderController.getOrderById);

orderRoutes.put('/:id', orderController.updateOrder);

orderRoutes.delete('/:id', orderController.deleteOrder);

export default orderRoutes;
