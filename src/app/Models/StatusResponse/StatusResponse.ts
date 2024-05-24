import { StatusModel } from "./StatusModel";

export interface StatusResponse{
    status: number;
    message: string;
    statusViewModel: StatusModel;
}