import { location } from "./location";

export interface JobLocationResponse
{
    status: number;
    message: string;
    jobLocation: location;
}