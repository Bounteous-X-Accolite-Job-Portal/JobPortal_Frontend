import { Guid } from "guid-typescript";

export interface SuccessfulOffer{
    id: Guid,
    isOfferLetterGenerated: boolean,
    candidateId: Guid,
    applicationId: Guid,
    jobId ?: Guid,
    closedJobId ?: Guid
}