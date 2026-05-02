import bcrypt from "bcryptjs";
import createHttpError from "http-errors";
import { signAccessToken } from "../configs/jwt";
import { LoginDto, RegisterDto, UserRole } from "../types/interfaces";
import { UserService } from "./UserService";

export class AuthService {
  private userService = new UserService();

  async register(data: RegisterDto) {
    const exists = await this.userService["repo"].isEmailExists(data.email);

    if (exists) {
      throw createHttpError(409, "Email already exists");
    }

    const user = await this.userService.createUser({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      avatar: null,
      role: UserRole.STUDENT,
    });

    const accessToken = signAccessToken({
      userId: user._id.toString(),
      role: user.role,
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
    };
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

    const accessToken = signAccessToken({
      userId: user._id.toString(),
      role: user.role,
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
    };
  }
}
