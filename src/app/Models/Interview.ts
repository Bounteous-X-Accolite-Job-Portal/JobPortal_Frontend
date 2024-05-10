import { Time } from "@angular/common"

export interface Interview{
    applicationId: string
    closedApplicationId: string
    interviewDate: Date,
    interviewTime: Time,
    interViewerId: string
    link: string,
    empId: string
}