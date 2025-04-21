import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import { handleErrors } from "../middlewares/errorHandler";
import { createPost, followUser, getAllUsersBasicDetails, getUserById } from "../db/userDBFunctions";

export const getAllUsers = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await getAllUsersBasicDetails();

      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      handleErrors(error as Error, req, res, next);
    }
  }
);

export const getUser = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
        const { id } = req.params;

        const user = await getUserById(id);

        res.status(200).json({
            success: true,
            data: user,
        });
        } catch (error) {
        next(error);
        }
    }
);

export const followUserController = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { followerId, followingId } = req.body;
  
        if (!followerId || !followingId) {
          return res.status(400).json({
            success: false,
            message: "Both followerId and followingId are required",
          });
        }
  
        const result = await followUser(followerId, followingId);
  
        res.status(201).json({
          success: true,
          message: "User followed successfully",
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
);

export const addPost = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { title, content, authorId } = req.body;
  
        if (!title || !content || !authorId) {
          return res.status(400).json({
            success: false,
            message: "Title, content, and authorId are required.",
          });
        }
  
        const newPost = await createPost(title, content, authorId);
  
        res.status(201).json({
          success: true,
          message: "Post created successfully",
          data: newPost,
        });
      } catch (error) {
        handleErrors(error as Error, req, res, next);
      }
    }
  );