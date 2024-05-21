import { GetReferral } from "../../get-referral";
import { Referral } from "../../referral";
import { Referralresponse } from "../../referralresponse";
import { Status } from "../../status";
import { StatusResponse } from "../../status-response";
import { Candidate } from "../Backend/Candidate";
import { Job } from "../JobResponse/Job";

export interface ReferralResponse{
    referral: Referralresponse,
    candidate: Candidate,
    job: Job,
    statusData: StatusResponse
}