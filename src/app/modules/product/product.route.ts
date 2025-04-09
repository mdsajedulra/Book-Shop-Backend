import { Router } from "express";
import { userController } from "../user/user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidationSchema } from "./product.validation";
import { productController } from "./product.controller";

const productRoute = Router();

//post to create product
productRoute.post(
  "/",
  validateRequest(ProductValidationSchema),
  productController.createProduct
);

productRoute.get("/", productController.getProduct); //patch to get all products
productRoute.get("/:id", productController.getSpecificProduct); //patch to get specific product
productRoute.delete(":id", productController.deleteProduct); //patch to delete specific product
productRoute.patch("/:id", productController.updateProduct); //patch to delete specific product

export default productRoute;
