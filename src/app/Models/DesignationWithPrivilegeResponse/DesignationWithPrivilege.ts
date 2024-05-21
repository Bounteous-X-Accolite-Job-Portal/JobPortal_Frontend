import { Guid } from "guid-typescript";

export interface DesignationWithPrivilege{
    designationId: number,
    employeeId: Guid,
    privilegeId: number,
}