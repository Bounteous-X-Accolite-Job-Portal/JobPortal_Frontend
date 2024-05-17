import { JobApplication } from "./JobApplication";

export interface AllJobApplicationResponse{
    status: string;
    message : string;
    allJobApplications : JobApplication;
}