import { model, Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { IChapterDocument, IChapterPaginateModel } from "../types/interfaces";

const ChapterSchema = new Schema<IChapterDocument>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minLength: [5, "Title must be at least 5 character"],
      maxLength: [20, "Title cannot be more than 20 character"],
    },
    course: {
      type: Types.ObjectId,
      ref: "Course",
      required: [true, "Course is required"],
    },
    order: {
      type: Number,
      required: [true, "Order is required"],
    },
    totalDuration: {
      type: Number,
      required: [true, "Total duration is required"],
    },
  },
  {
    timestamps: true,
  },
);

ChapterSchema.plugin(mongoosePaginate);

export const ChapterModel = model<IChapterDocument, IChapterPaginateModel>(
  "Chapter",
  ChapterSchema,
);
