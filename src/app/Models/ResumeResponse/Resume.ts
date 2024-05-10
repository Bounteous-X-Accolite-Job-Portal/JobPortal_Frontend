import { Guid } from "guid-typescript";

export interface Resume{
    resumeId: Guid,
    resumeUrl: string,
    candidateId: Guid
}