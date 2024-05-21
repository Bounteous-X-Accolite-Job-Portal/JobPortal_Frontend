import { DesignationWithPrivilege } from "../DesignationWithPrivilegeResponse/DesignationWithPrivilege";
import { Designation } from "./Designation";

export interface DesignationAndPrivilege{
    designation : Designation,
    privilege ?: DesignationWithPrivilege
}