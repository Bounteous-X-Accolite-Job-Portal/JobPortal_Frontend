import { Guid } from "guid-typescript";

export interface Experience{
    experienceId: Guid,
    experienceTitle: string,
    startDate: Date,
    endDate: Date,
    isCurrentlyWorking: boolean,
    description: string,
    companyId: Guid,
    candidateId: Guid
}