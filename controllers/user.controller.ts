import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import { handleErrors } from "../middlewares/errorHandler";
import { getAllUsersBasicDetails, getUserById } from "../db/userDBFunctions";

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