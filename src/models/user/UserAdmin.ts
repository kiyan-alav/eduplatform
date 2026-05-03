import { Schema } from "mongoose";
import { IAdminUser } from "../../types/interfaces/user.types";
import { User } from "./UserBase";

const AdminSchema = new Schema<IAdminUser>({});

export const AdminUser = User.discriminator<IAdminUser>("ADMIN", AdminSchema);
