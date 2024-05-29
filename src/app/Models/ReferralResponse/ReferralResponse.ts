import { Guid } from "guid-typescript"

export interface ReferralResponse {
    referralId:Guid,
    candidateId:Guid,
    jobId?:Guid,
    statusId:number,
    closedJobId?: Guid,
    applicationId?: Guid,
    closedApplicationId?: Guid
}


