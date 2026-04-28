import { model, Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import {
  IEnrollmentDocument,
  IEnrollmentPaginateModel,
} from "../types/interfaces";

const EnrollmentSchema = new Schema<IEnrollmentDocument>({
  student: {
    type: Types.ObjectId,
    ref: "User",
    required: [true, "Student is required"],
  },
  course: {
    type: Types.ObjectId,
    ref: "Course",
    required: [true, "Course is required"],
  },
  paid: {
    type: Number,
    required: [true, "Paid is required"],
  },
  paidAt: {
    type: Date,
    default: new Date(),
  },
});

EnrollmentSchema.plugin(mongoosePaginate);

export const EnrollmentModel = model<
  IEnrollmentDocument,
  IEnrollmentPaginateModel
>("Enrollment", EnrollmentSchema);
