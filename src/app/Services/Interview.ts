import { Guid } from "guid-typescript"

export interface Interview{
    applicationId: Guid,
    closedApplicationId: Guid,
    interviewDate: Date,
    interviewTime: string,
    interViewerId: Guid,
    link: string,
    empId: Guid
}