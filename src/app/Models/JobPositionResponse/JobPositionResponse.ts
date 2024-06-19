import { position } from "./position";

export interface JobPositionResponse{
    status: number;
    message: string;
    jobPosition: position;
}