import { Guid } from "guid-typescript";

export interface ClosedJob{
    closedJobId: Guid,
    jobCode: string,
    jobTitle: string,
    jobDescription: string,
    postDate: Date,
    lastDate: Date,
    degreeId: Guid,
    experience: string,
    categoryId: Guid,
    positionId: Guid,
    jobTypeId: Guid,
    locationId: Guid,
    employeeId: Guid
}