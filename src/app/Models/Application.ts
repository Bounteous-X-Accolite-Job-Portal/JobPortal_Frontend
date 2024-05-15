import { Guid } from "guid-typescript";

export interface Application{
    applicationId: Guid,
    candidateId: Guid,
    appliedOn: Date,
    statusId: number,
    jobId: Guid,
    closedJobId: Guid
}