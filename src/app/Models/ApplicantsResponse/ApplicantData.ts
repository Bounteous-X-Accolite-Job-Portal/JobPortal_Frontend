import { Guid } from "guid-typescript";
import { Candidate } from "../Backend/Candidate";
import { Skills } from "../SkillsResponse/Skills";
import { Resume } from "../ResumeResponse/Resume";
import { Status } from "../Status";
import { CompleteExperience } from "../ExperienceResponse/CompleteExperience";
import { CompleteEducation } from "../EducationResponse/CompleteEducation";

export interface ApplicantData{
    applicationId: Guid,
    jobId: Guid,
    candidateId: Guid,
    candidate: Candidate,
    skills: Skills,
    resume: Resume,
    status: Status,
    experience: CompleteExperience[],
    education: CompleteEducation[],
}