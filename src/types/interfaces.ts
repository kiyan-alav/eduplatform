import { Document, PaginateModel, Types } from "mongoose";
import { CustomQueryOptions } from "../utils/query-builder";
// ! ─── Consts Types ────────────────────────────────────────────
export enum UserRole {
  ADMIN = "admin",
  USER = "instructor",
  STUDENT = "student",
}

export enum CourseLevel {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
}

export enum CourseStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export enum NotificationType {
  INFO = "info",
  SUCCESS = "success",
  ADVANCED = "advanced",
}

// ! ─── Filter Types ────────────────────────────────────────────

export interface IUserFilter extends CustomQueryOptions {
  email?: string;
  fullName?: string;
  role?: UserRole;
}

export interface ICategoryFilter extends CustomQueryOptions {
  title?: string;
}

export interface ICourseFilter extends CustomQueryOptions {
  title?: string;
  instructor?: string;
  level?: CourseLevel;
  status?: CourseStatus;
  category?: string;
}

export interface IChapterFilter extends CustomQueryOptions {
  course?: string;
}

export interface IRatingFilter extends CustomQueryOptions {
  course?: string;
}

export interface IEnrollmentFilter extends CustomQueryOptions {
  course?: string;
}

// ! ─── User Types ────────────────────────────────────────────
export interface IUser {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
  avatar: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserDocument extends IUser, Document {}

export interface IUserPaginateModel extends PaginateModel<IUserDocument> {}

export interface ICreateUser {
  fullName: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface IUpdateUser {
  fullName?: string;
  email?: string;
  password?: string;
  avatar?: string;
}

// ! ─── Category Types ────────────────────────────────────────────
export interface ICategory {
  title: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICategoryDocument extends ICategory, Document {}

export interface ICategoryPaginateModel extends PaginateModel<ICategoryDocument> {}

export interface ICreateCategory {
  title: string;
}

export interface IUpdateCategory {
  title?: string;
}

// ! ─── Course Types ────────────────────────────────────────────
export interface ICourse {
  title: string;
  description: string;
  instructor: Types.ObjectId;
  price: number;
  level: CourseLevel;
  status: CourseStatus;
  category: Types.ObjectId;
  isPublished: boolean;
  discountPercentage: number;
  discountExpireAt: Date;
  avgRating: number;
  ratingCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICourseDocument extends ICourse, Document {}

export interface ICoursePaginateModel extends PaginateModel<ICourseDocument> {}

export interface ICreateCourse {
  title: string;
  description?: string;
  instructor: Types.ObjectId;
  price: number;
  level: CourseLevel;
  category: Types.ObjectId;
  isPublished: boolean;
  discountPercentage?: number;
  discountExpireAt?: Date;
}

export interface IUpdateCourse {
  title?: string;
  description?: string;
  instructor?: Types.ObjectId;
  price?: number;
  level?: CourseLevel;
  category?: Types.ObjectId;
  isPublished?: boolean;
  discountPercentage?: number;
  discountExpireAt?: Date;
}

// ! ─── Chapter Types ────────────────────────────────────────────
export interface IChapter {
  title: string;
  course: Types.ObjectId;
  order: number;
  totalDuration: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IChapterDocument extends IChapter, Document {}

export interface IChapterPaginateModel extends PaginateModel<IChapterDocument> {}

export interface ICreateChapter {
  title: string;
  course: Types.ObjectId;
  order: number;
}

export interface IUpdateChapter {
  title?: string;
  course?: Types.ObjectId;
  order?: number;
}

// ! ─── Lesson Types ────────────────────────────────────────────
export interface ILesson {
  title: string;
  chapter: Types.ObjectId;
  duration: number;
  videoUrl: string;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILessonDocument extends ILesson, Document {}

export interface ILessonPaginateModel extends PaginateModel<ILessonDocument> {}

export interface ICreateLesson {
  title: string;
  chapter: Types.ObjectId;
  duration?: number;
  videoUrl?: string;
  order: number;
}

export interface IUpdateLesson {
  title?: string;
  chapter?: Types.ObjectId;
  duration?: number;
  videoUrl?: string;
  order?: number;
}

// ! ─── Rating Types ────────────────────────────────────────────
export interface IRating {
  score: number;
  description: string;
  user: Types.ObjectId;
  course: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRatingDocument extends IRating, Document {}

export interface IRatingPaginateModel extends PaginateModel<IRatingDocument> {}

export interface ICreateRating {
  score: number;
  description?: string;
  user: Types.ObjectId;
  course: Types.ObjectId;
}

// ! ─── Notification Types ────────────────────────────────────────────

export interface INotification {
  title: string;
  description: string;
  user: Types.ObjectId;
  type: NotificationType;
  isRead: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface INotificationDocument extends INotification, Document {}

export interface INotificationPaginateModel extends PaginateModel<INotificationDocument> {}

export interface ICreateNotification {
  title: string;
  description: string;
  user: Types.ObjectId;
  type: NotificationType;
}

// ! ─── Enrollment Types ────────────────────────────────────────────
export interface IEnrollment {
  student: Types.ObjectId;
  course: Types.ObjectId;
  paid: number;
  paidAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IEnrollmentDocument extends IEnrollment, Document {}

export interface IEnrollmentPaginateModel extends PaginateModel<IEnrollmentDocument> {}

export interface ICreateEnrollment {
  student: Types.ObjectId;
  course: Types.ObjectId;
  paid: number;
  paidAt: Date;
}
