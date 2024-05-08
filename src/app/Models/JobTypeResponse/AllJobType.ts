import { JobType } from "./JobType";
export interface AllJobTypes{
    status: string;
    message: string;
    allJobTypes: JobType[];
}