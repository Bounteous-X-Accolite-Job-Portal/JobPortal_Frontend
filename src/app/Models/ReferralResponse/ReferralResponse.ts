import { GetReferral } from "../../get-referral";
import { Referral } from "../../referral";
import { Referralresponse } from "../../referralresponse";
import { Status } from "../../status";
import { Candidate } from "../Backend/Candidate";
import { Job } from "../JobResponse/Job";
import { StatusModel } from "../StatusResponse/StatusModel";

export interface ReferralResponse{
    referral: Referralresponse,
    candidate: Candidate,
    job: Job,
    statusData: StatusModel
}