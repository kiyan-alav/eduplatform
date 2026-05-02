import { Request, Response } from "express";
import createHttpError from "http-errors";
import { AuthRequest } from "../middlewares/auth.middleware";
import { AuthService } from "../services/AuthService";
import { UserService } from "../services/UserService";
import { ApiResponse } from "../types/apiResponse";

const authService = new AuthService();
const userService = new UserService();

export class AuthController {
  async register(req: Request, res: Response) {
    const result = await authService.register(req.body);

    const response: ApiResponse = {
      success: true,
      message: "User registered successfully",
      data: result,
    };

    res.status(201).json(response);
  }

  async login(req: Request, res: Response) {
    const result = await authService.login(req.body);

    const response: ApiResponse = {
      success: true,
      message: "Logged in successfully",
      data: result,
    };

    res.json(response);
  }

  async me(req: AuthRequest, res: Response) {
    if (!req.user) {
      throw createHttpError(401, "Unauthorized");
    }

    const user = await userService.getUser(req.user.userId);

    const response: ApiResponse = {
      success: true,
      data: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    };

    res.json(response);
  }
}

export const authController = new AuthController();
