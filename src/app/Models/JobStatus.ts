import { StatusModel } from "./StatusResponse/StatusModel";

export interface JobStatus {
    status:string,
    message:string,
    statusViewModel:StatusModel;
}