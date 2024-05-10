import { Candidate } from "../Backend/Candidate";
import { ClosedJob } from "../ClosedJob";
import { Experience } from "../Experience";
import { Job } from "../JobResponse/Job";
import { Resume } from "../ResumeResponse/Resume";
import { Skills } from "../SkillsResponse/Skills";

export interface interviewCardData{
    interviewDate: Date,
    interviewTime: string,
    link: string,
    Candidate: Candidate,
    Resume: Resume,
    Job?: Job,
    ClosedJob?: ClosedJob,
}