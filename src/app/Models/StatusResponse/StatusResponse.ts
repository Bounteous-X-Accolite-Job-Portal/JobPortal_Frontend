import { Status } from "./Status";

export interface StatusResponse{
    status:string;
    message:string;
    statusViewModel:Status;
}