import { Referralresponse } from "./referralresponse";
import { Candidate } from "../Backend/Candidate";
import { Job } from "../JobResponse/Job";
import { StatusModel } from "../StatusResponse/StatusModel";

export interface ReferralCompleteResponse{
    referral: Referralresponse,
    candidate: Candidate,
    job: Job,
    statusData: StatusModel
}