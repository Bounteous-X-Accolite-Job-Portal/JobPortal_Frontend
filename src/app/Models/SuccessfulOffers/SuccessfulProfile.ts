import { Candidate } from "../Backend/Candidate";
import { ClosedJob } from "../ClosedJobResponse/ClosedJob";
import { Job } from "../JobResponse/Job";
import { SuccessfulOffer } from "./SuccessfulOffer";

export interface SuccessfulProfile{
    successfulOffer : SuccessfulOffer,
    candidate : Candidate,
    job ?: Job,
    closedJob ?: ClosedJob,
}