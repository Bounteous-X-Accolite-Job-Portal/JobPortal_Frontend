import { SuccessfulOffer } from "./SuccessfulOffer";

export interface SuccessfulOfferResponse{
    status: number,
    message: string,
    successfulJobApplication: SuccessfulOffer[]
}