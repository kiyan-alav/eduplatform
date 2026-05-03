import { Schema } from "mongoose";

export const BaseProfileFields = {
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  bio: { type: String, default: null },
  phone: { type: String, default: null },
  avatar: { type: String, default: null },
};
