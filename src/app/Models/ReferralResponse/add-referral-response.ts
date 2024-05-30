import { ReferralResponse } from './ReferralResponse';

export interface AddReferralResponse {
  status: number;
  message: string;
  referral: ReferralResponse;
}
