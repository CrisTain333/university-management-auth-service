import express from 'express';
import { UserController } from './user.controller';
// import usersController from './user.controller';
const router = express.Router();

router.post('/create-user', UserController.createUser);

export const userRoute = router;
