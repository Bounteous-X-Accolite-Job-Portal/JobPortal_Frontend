import { Designation } from "../DesignationResponse/Designation";

export interface AllDesignationWithPrivilegeResponse{
    status: number,
    message: string,
    allPrivileges: Designation[]
}