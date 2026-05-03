import { model, Schema } from "mongoose";
import { IInstructorProfile } from "../../types/interfaces/user.types";
import { BaseProfileFields } from "./BaseProfile";

const InstructorProfileSchema = new Schema<IInstructorProfile>(
  {
    ...BaseProfileFields,
    headline: String,
    about: String,
    skills: [String],
    socialLinks: {
      website: String,
      linkedin: String,
      github: String,
    },
  },
  { timestamps: true },
);

export const InstructorProfile = model<IInstructorProfile>(
  "InstructorProfile",
  InstructorProfileSchema,
);
