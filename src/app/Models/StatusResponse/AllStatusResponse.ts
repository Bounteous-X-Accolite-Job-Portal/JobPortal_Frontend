import { StatusModel } from "./StatusModel";

export interface AllStatusResponse{
    status:string;
    message:string;
    allStatus: StatusModel[];
}