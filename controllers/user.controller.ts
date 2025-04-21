import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import { handleErrors } from "../middlewares/errorHandler";
import { getAllUsersBasicDetails } from "../db/userDBFunctions";

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
