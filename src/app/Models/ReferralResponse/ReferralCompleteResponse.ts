import { ReferralResponse } from "./ReferralResponse";
import { Candidate } from "../Backend/Candidate";
import { Job } from "../JobResponse/Job";
import { StatusModel } from "../StatusResponse/StatusModel";
import { ClosedJob } from "../ClosedJobResponse/ClosedJob";

export interface ReferralCompleteResponse{
    candidate: Candidate,
    job?: Job,
    statusData: StatusModel,
    closedJob?: ClosedJob
}