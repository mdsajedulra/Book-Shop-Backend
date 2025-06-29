import { Router } from 'express';
import userRoute from '../modules/user/user.route';
import authrouter from '../modules/auth/auth.route';


const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/auth',
    route: authrouter,
  },
  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
