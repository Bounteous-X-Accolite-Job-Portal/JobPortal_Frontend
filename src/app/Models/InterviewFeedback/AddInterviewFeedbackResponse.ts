import { Guid } from "guid-typescript"

export interface AddInterviewFeedbackResponse{
    status: number,
    message: string,
    interviewFeedback: {
        status: number,
        message: string,
        interviewId: Guid,
        rating: number,
        feedback: string,
        additionalLink: string,
        employeeId: Guid
    }
}