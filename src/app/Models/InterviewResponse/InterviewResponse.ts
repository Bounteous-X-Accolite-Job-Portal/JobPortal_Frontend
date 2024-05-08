import { Time } from "@angular/common"
import { Guid } from "guid-typescript"

export interface interviewResponse{
    status: number,
    message: string,
    applicationId: Guid,
    closedApplicationId: Guid,
    interviewDate: Date,
    interviewTime: Time,
    interViewerId: Guid,
    link: string,
    empId: Guid
}