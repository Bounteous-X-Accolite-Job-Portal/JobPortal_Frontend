import { JobCategory } from "./JobCategory";

export interface JobCategoryResponse{
    status: number;
    message: string;
    jobCategory: JobCategory;
}