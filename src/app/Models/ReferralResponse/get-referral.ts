
import { Guid } from "guid-typescript"
import { Referralresponse } from "./referralresponse";


export interface GetReferral {
    status: string;
    message: string;
    referrals:Referralresponse [] ;  

}
