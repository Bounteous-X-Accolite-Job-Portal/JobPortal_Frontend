import { ReferralResponse } from "./ReferralResponse";

export interface GetReferral {
    status: string;
    message: string;
    referrals: ReferralResponse[];  
}
