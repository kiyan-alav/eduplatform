import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import {
  IUserDocument,
  IUserPaginateModel,
  UserRole,
} from "../types/interfaces";

const UserSchema = new Schema<IUserDocument>(
  {
    fullName: {
      type: String,
      required: [true, "Fullname is required"],
      trim: true,
      minLength: [2, "Fullname must be at least 2 character"],
      maxLength: [50, "Fullname cannot be more than 50 character"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must be at least 6 character"],
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      required: [true, "Role must be defined!"],
    },
    avatar: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.plugin(mongoosePaginate);

export const UserModel = model<IUserDocument, IUserPaginateModel>(
  "User",
  UserSchema,
);
