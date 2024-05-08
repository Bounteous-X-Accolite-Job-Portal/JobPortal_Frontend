import { JobCategory } from "./JobCategory";

export interface AllJobCategory{
    status: string;
    message: string;
    allJobCategory: JobCategory[] ;  
}