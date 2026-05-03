import { Schema, model } from "mongoose";
import { IStudentProfile } from "../../types/interfaces/user.types";
import { BaseProfileFields } from "./BaseProfile";

const StudentProfileSchema = new Schema<IStudentProfile>(
  {
    ...BaseProfileFields,
    educationLevel: String,
    interests: [String],
    learningGoals: [String],
  },
  { timestamps: true },
);

export const StudentProfile = model<IStudentProfile>(
  "StudentProfile",
  StudentProfileSchema,
);
