import { Schema } from "mongoose";
import { IStudentUser } from "../../types/interfaces/user.types";
import { User } from "./UserBase";

const StudentSchema = new Schema<IStudentUser>({
  enrolledCoursesCount: { type: Number, default: 0 },
});

export const StudentUser = User.discriminator<IStudentUser>(
  "STUDENT",
  StudentSchema,
);
