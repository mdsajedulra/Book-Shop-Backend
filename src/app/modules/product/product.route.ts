/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Router } from 'express';
import { userController } from '../user/user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValidationSchema } from './product.validation';
import { productController } from './product.controller';
import auth from '../../middlewares/auth';
import multer from 'multer';

const productRoute = Router();
const upload = multer()

//post to create product
productRoute.post(
  '/',
  // validateRequest(ProductValidationSchema),
  // auth('admin'),
  upload.single('image'),
  productController.createProduct,
);

productRoute.get('/', productController.getProduct); //patch to get all products
productRoute.get('/:id', productController.getSpecificProduct); //patch to get specific product
productRoute.delete(':id', auth('admin'), productController.deleteProduct); //patch to delete specific product
productRoute.patch('/:id', auth('admin'), productController.updateProduct); //patch to delete specific product

export default productRoute;
