import { Document, PaginateModel, Types } from "mongoose";
import { CustomQueryOptions } from "../../utils/query-builder";

// ! ─── Consts Types ────────────────────────────────────────────
export enum UserRole {
  ADMIN = "ADMIN",
  INSTRUCTOR = "INSTRUCTOR",
  STUDENT = "STUDENT",
}

export enum UserProfileModel {
  ADMIN_PROFILE = "AdminProfile",
  INSTRUCTOR_PROFILE = "InstructorProfile",
  STUDENT_PROFILE = "StudentProfile",
}

// ! ─── Filter Types ────────────────────────────────────────────
export interface IUserFilter extends CustomQueryOptions {
  email?: string;
  fullName?: string;
  role?: UserRole[];
  profileModel?: UserProfileModel[];
}

// ! ─── Core Types ────────────────────────────────────────────
export interface IBaseUser {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
  avatar: string | null;
  profile?: Types.ObjectId | null;
  profileModel?: UserProfileModel | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAdminUser extends IBaseUser {
  role: UserRole.ADMIN;
}

export interface IInstructorUser extends IBaseUser {
  role: UserRole.INSTRUCTOR;
  expertise?: string[];
  isVerified?: boolean;
}

export interface IStudentUser extends IBaseUser {
  role: UserRole.STUDENT;
  enrolledCoursesCount?: number;
}

export type IUser = IAdminUser | IInstructorUser | IStudentUser;

export type IUserDocument = IUser & Document;

export interface IUserPaginateModel extends PaginateModel<IUserDocument> {}

export interface IBaseProfile {
  user: Types.ObjectId;
  bio?: string;
  phone?: string;
  avatar?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAdminProfile extends IBaseProfile {
  displayName?: string;
}

export interface IInstructorProfile extends IBaseProfile {
  headline?: string;
  about?: string;
  skills?: string[];
  socialLinks?: {
    website?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface IStudentProfile extends IBaseProfile {
  educationLevel?: string;
  interests?: string[];
  learningGoals?: string[];
}

export interface ICreateUserBase {
  fullName: string;
  email: string;
  password: string;
  avatar?: string | null;
}

export interface ICreateAdminUser extends ICreateUserBase {
  role: UserRole.ADMIN;
}

export interface ICreateInstructorUser extends ICreateUserBase {
  role: UserRole.INSTRUCTOR;
  expertise?: string[];
  isVerified?: boolean;
  profile?: {
    bio?: string;
    phone?: string;
    headline?: string;
    about?: string;
    skills?: string[];
    socialLinks?: {
      website?: string;
      linkedin?: string;
      github?: string;
    };
  };
}

export interface ICreateStudentUser extends ICreateUserBase {
  role: UserRole.STUDENT;
  profile?: {
    bio?: string;
    phone?: string;
    educationLevel?: string;
    interests?: string[];
    learningGoals?: string[];
  };
}

export type ICreateUser =
  | ICreateAdminUser
  | ICreateInstructorUser
  | ICreateStudentUser;

export interface IUpdateUser {
  fullName?: string;
  password?: string;
  avatar?: string | null;
}

export interface IUpdateInstructorUser extends IUpdateUser {
  expertise?: string[];
  isVerified?: boolean;
}

export interface IUpdateStudentUser extends IUpdateUser {
  enrolledCoursesCount?: number;
}

export interface IUpdateBaseProfile {
  bio?: string;
  phone?: string;
  avatar?: string | null;
}

export interface IUpdateInstructorProfile extends IUpdateBaseProfile {
  headline?: string;
  about?: string;
  skills?: string[];
  socialLinks?: {
    website?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface IUpdateStudentProfile extends IUpdateBaseProfile {
  educationLevel?: string;
  interests?: string[];
  learningGoals?: string[];
}
