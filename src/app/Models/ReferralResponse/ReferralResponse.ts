import { Guid } from "guid-typescript"

export interface ReferralResponse {
    referralId?:Guid,
    candidateId?:Guid,
    jobId?:Guid,
    empId?:Guid,
    statusId?:number
}


