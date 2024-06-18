import { JobType } from "./JobType";

export interface JobTypeResponse{
    status:number;
    message:string;
    jobType: JobType;
}