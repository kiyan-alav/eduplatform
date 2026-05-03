import { model, Schema } from "mongoose";
import { IAdminProfile } from "../../types/interfaces/user.types";
import { BaseProfileFields } from "./BaseProfile";

const AdminProfileSchema = new Schema<IAdminProfile>(
  {
    ...BaseProfileFields,
    displayName: String,
  },
  { timestamps: true },
);

export const AdminProfile = model<IAdminProfile>(
  "AdminProfile",
  AdminProfileSchema,
);
