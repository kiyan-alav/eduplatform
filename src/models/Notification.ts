import { model, Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import {
  INotificationDocument,
  INotificationPaginateModel,
  NotificationType,
} from "../types/interfaces";

const NotificationSchema = new Schema<INotificationDocument>(
  {
    title: {
      type: String,
      required: [true, "Title duration is required"],
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
    type: {
      type: String,
      enum: Object.values(NotificationType),
      required: [true, "Notification type is required"],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

NotificationSchema.plugin(mongoosePaginate);

export const NotificationModel = model<
  INotificationDocument,
  INotificationPaginateModel
>("Notification", NotificationSchema);
