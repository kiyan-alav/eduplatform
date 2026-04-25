import { NextFunction, Request, Response } from "express";
import { ENV } from "../configs/env";
import { logger } from "../configs/logger";

export function errorMiddleware(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  logger.error({
    status,
    message,
    stack: err.stack,
  });

  res.status(status).json({
    success: false,
    message,
    stack: ENV.NODE_ENV === "development" ? err.stack : undefined,
  });
}
