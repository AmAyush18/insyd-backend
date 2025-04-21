import express from 'express';
import { addPost, followUserController, getAllUsers, getUser } from '../controllers/user.controller';

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

userRouter.post(
    "/post", 
    addPost
);

export default userRouter;
