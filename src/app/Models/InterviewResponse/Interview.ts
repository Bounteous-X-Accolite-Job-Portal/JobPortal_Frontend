import { Time } from "@angular/common"
import { Guid } from "guid-typescript"

export interface Interview{
    interviewId: Guid,
    applicationId: string,
    closedApplicationId: string,
    interviewDate: Date,
    interviewTime: Time,
    interViewerId: string,
    link: string,
    feedbackId?: Guid,
    empId: string,
}