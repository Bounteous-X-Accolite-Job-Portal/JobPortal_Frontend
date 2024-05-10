import { Candidate } from "../Backend/Candidate";
import { ClosedJob } from "../ClosedJob";
import { Experience } from "../Experience";
import { Job } from "../Job";
import { Resume } from "../Resume";
import { Skills } from "../Skills";

export interface interviewCardData{
    interviewDate: Date,
    interviewTime: string,
    link: string,
    Candidate: Candidate,
    Resume: Resume,
    Job?: Job,
    ClosedJob?: ClosedJob,
}