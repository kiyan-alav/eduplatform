import { Schema } from "mongoose";
import { IInstructorUser } from "../../types/interfaces/user.types";
import { User } from "./UserBase";

const InstructorSchema = new Schema<IInstructorUser>({
  expertise: { type: [String], default: [] },
  isVerified: { type: Boolean, default: false },
});

export const InstructorUser = User.discriminator<IInstructorUser>(
  "INSTRUCTOR",
  InstructorSchema,
);
