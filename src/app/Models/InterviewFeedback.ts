import { Guid } from "guid-typescript";

export interface InterviewFeedback{
    interviewId: Guid,
    rating: number,
    feedback: string,
    additionalLink: string
}