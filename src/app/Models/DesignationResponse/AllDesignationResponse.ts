import { Designation } from "./Designation";

export interface AllDesignationResponse{
    status: number,
    message: string,
    allDesignations: Designation[]
}