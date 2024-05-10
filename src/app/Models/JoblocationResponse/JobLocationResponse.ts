import { location } from "./location";

export interface JobLocationResponse
{
    status: string;
    message: string;
    jobLocation: location;
}