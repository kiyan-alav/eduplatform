import { model, Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import {
  CourseLevel,
  CourseStatus,
  ICourseDocument,
  ICoursePaginateModel,
} from "../types/interfaces";

const CourseSchema = new Schema<ICourseDocument>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minLength: [5, "Title must be at least 5 character"],
      maxLength: [20, "Title cannot be more than 20 character"],
    },
    description: {
      type: String,
      default: null,
    },
    instructor: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Instructor is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price at least can be 0"],
    },
    level: {
      type: String,
      enum: Object.values(CourseLevel),
      required: [true, "Course level is required"],
    },
    status: {
      type: String,
      enum: Object.values(CourseStatus),
      default: CourseStatus.PENDING || "pending",
    },
    category: {
      type: Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    discountPercentage: {
      type: Number,
      default: null,
    },
    discountExpireAt: {
      type: Date,
      required: function (this: ICourseDocument) {
        return this.discountPercentage !== null && this.discountPercentage > 0;
      },
    },
    avgRating: {
      type: Number,
      default: null,
    },
    ratingCount: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

CourseSchema.plugin(mongoosePaginate);

export const CourseModel = model<ICourseDocument, ICoursePaginateModel>(
  "Course",
  CourseSchema,
);
