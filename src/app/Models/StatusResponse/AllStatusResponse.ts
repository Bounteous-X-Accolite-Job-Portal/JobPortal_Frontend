import { Status } from "./Status";

export interface AllStatusResponse{
    status:string;
    message:string;
    allStatus: Status[];
}