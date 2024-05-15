import { Guid } from "guid-typescript"

export interface interviewResponse{
    status: number,
    message: string,
    interviewId: Guid,
    applicationId: Guid,
    closedApplicationId: Guid,
    interviewDate: Date,
    interviewTime: string,
    interViewerId: Guid,
    link: string,
    feedbackId?: Guid,
    empId: Guid
}