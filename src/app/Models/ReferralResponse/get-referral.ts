import { ReferralResponse } from './ReferralResponse';

export interface GetReferral {
  status: number;
  message: string;
  referrals: ReferralResponse[];
}
