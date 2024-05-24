import { Designation } from "./Designation";

export interface DesignationResponse{
    status: number,
    message: string,
    designation: Designation
}