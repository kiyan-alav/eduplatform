import { UserModel } from "../models/User";
import { IUser, IUserDocument, IUserFilter } from "../types/interfaces";
import { buildQueryFilters, FilterConfig } from "../utils/query-builder";
import { BaseRepository } from "./BaseRepository";

export class UserRepository extends BaseRepository<IUserDocument> {
  constructor() {
    super(UserModel);
  }

  async findByEmail(email: string) {
    return this.findOne({ email });
  }

  async isEmailExists(email: string) {
    return this.exists({ email });
  }

  async paginateUser(filter: IUserFilter) {
    const config: FilterConfig<IUser> = {
      searchable: ["fullName", "email"],
      regex: ["fullName"],
      exact: ["role"],
      enumList: [],
    };

    const { mongoFilter, options } = buildQueryFilters<IUser>(filter, config);

    return this.paginate(mongoFilter, {
      ...options,
      select: ["fullName", "email", "role", "avatar", "createdAt"],
    });
  }
}
