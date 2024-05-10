import { position } from "./position";

export interface JobPositionResponse{
    status: string;
    message: string;
    jobPosition: position;
}