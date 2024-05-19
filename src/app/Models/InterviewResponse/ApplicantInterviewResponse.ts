import { ApplicantInterview } from "./ApplicantInterview";

export interface ApplicantInterviewResponse{
    status: number,
    message: string,
    allInterviews: ApplicantInterview[]
}