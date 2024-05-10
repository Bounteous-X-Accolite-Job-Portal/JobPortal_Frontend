import { Guid } from "guid-typescript";

export interface Skills{
    skillsId: Guid,
    candidateSkills: string,
    candidateId: Guid
}