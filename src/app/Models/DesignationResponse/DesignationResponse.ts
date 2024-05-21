import { Designation } from "./Designation";

export interface DesignationResponse{
    status:string;
    message:string;
    designation:Designation;
}