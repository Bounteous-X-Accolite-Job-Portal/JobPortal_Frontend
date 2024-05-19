import { Status } from "../Status";

export interface StatusResponse{
    status: number,
    message: string,
    allStatus: Status[]
}