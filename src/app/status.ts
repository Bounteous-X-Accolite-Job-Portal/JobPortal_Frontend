import { StatusResponse } from "./status-response";

export interface Status {
    status:string,
    message:string,
    statusViewModel:StatusResponse;
}