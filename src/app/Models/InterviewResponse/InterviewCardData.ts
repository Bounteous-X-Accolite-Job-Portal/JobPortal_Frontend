import { Guid } from "guid-typescript";
import { Candidate } from "../Backend/Candidate";
import { ClosedJob } from "../ClosedJobResponse/ClosedJob";
import { Experience } from "../ExperienceResponse/Experience";
import { Job } from "../JobResponse/Job";
import { Resume } from "../ResumeResponse/Resume";
import { Skills } from "../SkillsResponse/Skills";

export interface interviewCardData{
    interviewId: Guid,
    interviewDate: Date,
    interviewTime: string,
    link: string,
    feedbackId?: Guid,
    Candidate: Candidate,
    Resume: Resume,
    Job?: Job,
    ClosedJob?: ClosedJob,
}