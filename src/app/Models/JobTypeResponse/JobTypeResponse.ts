import { JobType } from "./JobType";

export interface JobTypeResponse{
    status:string;
    message:string;
    jobType: JobType;
}