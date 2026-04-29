import { FilterConfig } from "../utils/query-builder";
import {
  ICategoryDocument,
  IChapterDocument,
  ICourseDocument,
  IEnrollmentDocument,
  IRatingDocument,
  IUserDocument,
} from "./interfaces";

export const UserFilterConfig: FilterConfig<IUserDocument> = {
  searchable: ["fullName", "email"],
  regex: ["fullName", "email"],
  exact: ["role"],
  enumList: ["role"],
};

export const CategoryFilterConfig: FilterConfig<ICategoryDocument> = {
  searchable: ["title"],
  regex: ["title"],
};

export const CourseFilterConfig: FilterConfig<ICourseDocument> = {
  searchable: ["title", "description"],
  regex: ["title", "description"],
  exact: ["instructor", "level", "status", "category"],
  enumList: ["level", "status"],
};

export const ChapterFilterConfig: FilterConfig<IChapterDocument> = {
  exact: ["course"],
};

export const RatingFilterConfig: FilterConfig<IRatingDocument> = {
  exact: ["course", "user"],
};

export const EnrollmentFilterConfig: FilterConfig<IEnrollmentDocument> = {
  exact: ["course", "student"],
};
