import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { ICategoryDocument, ICategoryPaginateModel } from "../types/interfaces";

const CategorySchema = new Schema<ICategoryDocument>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minLength: [5, "Title must be at least 5 character"],
      maxLength: [20, "Title cannot be more than 20 character"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
    },
  },
  {
    timestamps: true,
  },
);

CategorySchema.plugin(mongoosePaginate);

export const CategoryModel = model<ICategoryDocument, ICategoryPaginateModel>(
  "Category",
  CategorySchema,
);
