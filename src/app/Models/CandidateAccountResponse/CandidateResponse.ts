import { Candidate } from "../Backend/Candidate";

export interface CandidateResponse{
    status: number;
    message: string;
    candidate: Candidate
}