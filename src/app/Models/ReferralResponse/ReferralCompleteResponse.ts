import { ReferralResponse } from "./ReferralResponse";
import { Candidate } from "../Backend/Candidate";
import { Job } from "../JobResponse/Job";
import { StatusModel } from "../StatusResponse/StatusModel";

export interface ReferralCompleteResponse{
    referral: ReferralResponse,
    candidate: Candidate,
    job: Job,
    statusData: StatusModel
}