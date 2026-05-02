import bcrypt from "bcryptjs";
import createHttpError from "http-errors";
import { ENV } from "../configs/env";
import { UserRepository } from "../repositories/UserRepository";
import { ICreateUser, IUpdateUser, IUserFilter, UserRole } from "../types/interfaces";

export class UserService {
  private readonly repo = new UserRepository();

  async getUsers(filter: IUserFilter) {
    const result = await this.repo.paginateUser(filter);

    return {
      data: result.docs,
      meta: {
        page: result.page,
        limit: result.limit,
        total: result.totalDocs,
        totalPages: result.totalPages,
        hasNextPage: result.hasNextPage,
        hasPrevPage: result.hasPrevPage,
      },
    };
  }

  async getUser(id: string) {
    const user = await this.repo.findById(id);
    if (!user) {
      throw createHttpError(404, "User not found!");
    }
    return user;
  }

  async createUser(data: ICreateUser) {
    const exists = await this.repo.isEmailExists(data.email);

    if (exists) {
      throw createHttpError(409, "Email already exists");
    }

    const salt = await bcrypt.genSalt(ENV.BCRYPT_SALT);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    return this.repo.create({
      ...data,
      password: hashedPassword,
      role: data.role ?? UserRole.STUDENT,
    });
  }

  async updateUser(id: string, data: IUpdateUser) {
    return this.repo.updateById(id, data);
  }

  async deleteUser(id: string) {
    return this.repo.deleteById(id);
  }
}
