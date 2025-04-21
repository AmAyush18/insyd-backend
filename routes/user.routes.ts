import express from 'express';
import { getAllUsers, getUser } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.get(
    "/users",
    getAllUsers
);

userRouter.get(
    "/user/:id",
    getUser
);

export default userRouter;
