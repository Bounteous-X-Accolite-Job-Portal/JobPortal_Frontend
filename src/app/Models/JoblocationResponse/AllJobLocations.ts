import { location } from "./location";

export interface AllJobLocations{
    status: string;
    message: string;
    allJobLocations: location[];
}