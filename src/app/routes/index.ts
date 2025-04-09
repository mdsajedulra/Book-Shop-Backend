import { Router } from "express";
import userRoute from "../modules/user/user.route";
import authrouter from "../modules/auth/auth.route";
import productRoute from "../modules/product/product.route";
import orderRoutes from "../modules/order/order.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/auth",
    route: authrouter,
  },
  {
    path: "/product",
    route: productRoute,
  },
  {
    path: "/order",
    route: orderRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
