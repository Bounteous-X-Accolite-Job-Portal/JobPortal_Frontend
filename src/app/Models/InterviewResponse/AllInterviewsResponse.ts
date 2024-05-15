import { interviewResponse } from "./InterviewResponse";

export interface AllInterviewsResponse{
    status: string;
    message: string;
    allInterviews: interviewResponse[] ;  
}