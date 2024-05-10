import { candidateEducation } from "./candidateEducation";

export interface AllCandidateEducation{
    status : string;
    message : string;
    candidateEducation : candidateEducation[];
}