import express from 'express';
import { getAllUsers } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.get(
    "/users",
    getAllUsers
);

export default userRouter;
