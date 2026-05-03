import {
  IRefreshTokenDocument,
  RefreshTokenModel,
} from "../models/RefreshToken";
import { BaseRepository } from "./BaseRepository";

export class RefreshTokenRepository extends BaseRepository<IRefreshTokenDocument> {
  constructor() {
    super(RefreshTokenModel);
  }

  async findByToken(token: string) {
    return this.findOne({ token });
  }

  async deleteByToken(token: string) {
    return this.model.findOneAndDelete({ token });
  }

  async deleteByUser(userId: string) {
    return this.model.deleteMany({ user: userId });
  }
}
