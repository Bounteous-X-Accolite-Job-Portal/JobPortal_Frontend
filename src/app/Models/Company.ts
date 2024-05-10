import { Guid } from "guid-typescript";

export interface Company{
    companyId: Guid,
    companyName: string,
    baseUrl: string,
    companyDescription: string,
    empId: Guid
}