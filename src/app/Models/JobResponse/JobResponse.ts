import { Job } from "../Job";

export interface JobResponse{
    status: number,
    message: string,
    job: Job 
}