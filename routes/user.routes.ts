import express from 'express';
import { followUserController, getAllUsers, getUser } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.get(
    "/users",
    getAllUsers
);

userRouter.get(
    "/user/:id",
    getUser
);

userRouter.post(
    "/follow", 
    followUserController
);

export default userRouter;
