import { ClosedJob } from "./ClosedJob";

export interface ClosedJobResponse{
    status: number;
    message: string;
    closedJob: ClosedJob
}