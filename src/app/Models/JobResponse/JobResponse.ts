import { Job } from "./Job";

export interface JobResponse{
    status: string;
    message: string;
    job: Job;
}