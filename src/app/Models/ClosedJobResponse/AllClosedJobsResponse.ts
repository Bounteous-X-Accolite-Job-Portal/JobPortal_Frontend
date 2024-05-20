import { ClosedJob } from "./ClosedJob";

export interface AllClosedJobsResponse{
    status: number,
    message: string,
    closedJobs: ClosedJob[]
}