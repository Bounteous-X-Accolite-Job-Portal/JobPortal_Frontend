import { Degree } from "./Degree";

export interface AllDegreeResponse{
    status : string;
    message : string;
    degrees : Degree[];
}