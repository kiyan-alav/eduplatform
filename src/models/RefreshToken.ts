import { Document, model, PaginateModel, Schema, Types } from "mongoose";

export interface IRefreshToken {
  user: Types.ObjectId;
  token: string;
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRefreshTokenDocument extends IRefreshToken, Document {}

export interface IRefreshTokenPaginateModel extends PaginateModel<IRefreshTokenDocument> {}

const RefreshTokenSchema = new Schema<IRefreshTokenDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const RefreshTokenModel = model<
  IRefreshTokenDocument,
  IRefreshTokenPaginateModel
>("RefreshToken", RefreshTokenSchema);
