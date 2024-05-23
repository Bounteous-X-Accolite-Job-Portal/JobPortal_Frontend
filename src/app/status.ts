import { StatusModel } from "./Models/StatusResponse/StatusModel";

export interface Status {
    status:string,
    message:string,
    statusViewModel:StatusModel;
}