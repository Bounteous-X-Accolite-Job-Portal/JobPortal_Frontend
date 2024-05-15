import { Job } from "./Job";

export interface AllJob{
    status:string;
    message:string;
    allJobs: Job[];
}