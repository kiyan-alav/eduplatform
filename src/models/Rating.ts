import { model, Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { IRatingDocument, IRatingPaginateModel } from "../types/interfaces";

const RatingSchema = new Schema<IRatingDocument>(
  {
    score: {
      type: Number,
      required: [true, "Score duration is required"],
    },
    description: {
      type: String,
      default: null,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    course: {
      type: Types.ObjectId,
      ref: "Course",
      required: [true, "Course is required"],
    },
  },
  {
    timestamps: true,
  },
);

RatingSchema.plugin(mongoosePaginate);

export const RatingModel = model<IRatingDocument, IRatingPaginateModel>(
  "Rating",
  RatingSchema,
);
