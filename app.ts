import express, { NextFunction, Request, Response } from "express";
export const app = express();
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.routes";

dotenv.config();

app.use(express.json({ limit: "1mb" }));

// cors
app.use(
  cors({
    origin: process.env.ORIGIN?.split(","),
    credentials: true,
  })
);

// routes
app.use("/api/v1", userRouter);

// test api
app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      success: true,
      message: "API is working",
    });
  } catch (error) {
    next(error);
  }
});

// unknown routes
app.use((req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
});
  