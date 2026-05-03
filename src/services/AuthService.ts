import bcrypt from "bcryptjs";
import createHttpError from "http-errors";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../configs/jwt";
import { RefreshTokenRepository } from "../repositories/RefreshTokenRepository";
import { IUserDocument, LoginDto, RegisterDto, UserRole } from "../types/interfaces";
import { UserService } from "./UserService";

export class AuthService {
  private userService = new UserService();
  private refreshRepo = new RefreshTokenRepository();

  private async generateTokens(user: IUserDocument) {
    const payload = {
      userId: user._id.toString(),
      role: user.role,
    };

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    await this.refreshRepo.create({
      user: user._id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return {
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      accessToken,
      refreshToken,
    };
  }

  async register(data: RegisterDto) {
    const user = await this.userService.createUser({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      avatar: null,
      role: UserRole.STUDENT,
    });

    return this.generateTokens(user);
  }

  async login(data: LoginDto) {
    const user = await this.userService["repo"].findByEmail(data.email);

    if (!user) {
      throw createHttpError(401, "Invalid email or password");
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw createHttpError(401, "Invalid email or password");
    }

    return this.generateTokens(user);
  }

  async refreshToken(token: string) {
    const payload = verifyRefreshToken(token);

    const stored = await this.refreshRepo.findByToken(token);

    if (!stored) {
      throw createHttpError(401, "Invalid refresh token");
    }

    const accessToken = signAccessToken({
      userId: payload.userId,
      role: payload.role,
    });

    return { accessToken };
  }

  async logout(refreshToken: string) {
    await this.refreshRepo.deleteByToken(refreshToken);
  }
}
