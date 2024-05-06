import { JobCategory } from "./JobCategory";

export interface JobCategoryResponse{
    status: string;
    message: string;
    jobCategory: JobCategory;
}