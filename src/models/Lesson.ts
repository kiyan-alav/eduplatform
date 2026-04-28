import { model, Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { ILessonDocument, ILessonPaginateModel } from "../types/interfaces";

const LessonSchema = new Schema<ILessonDocument>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minLength: [5, "Title must be at least 5 character"],
      maxLength: [20, "Title cannot be more than 20 character"],
    },
    chapter: {
      type: Types.ObjectId,
      ref: "Chapter",
      required: [true, "Chapter is required"],
    },
    duration: {
      type: Number,
      required: [true, "Duration is required"],
    },
    videoUrl: {
      type: String,
      default: null,
    },
    order: {
      type: Number,
      required: [true, "Order is required"],
    },
  },
  {
    timestamps: true,
  },
);

LessonSchema.plugin(mongoosePaginate);

export const LessonModel = model<ILessonDocument, ILessonPaginateModel>(
  "Lesson",
  LessonSchema,
);
