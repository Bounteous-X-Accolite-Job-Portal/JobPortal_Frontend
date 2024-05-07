import { Guid } from "guid-typescript";
export interface Job{
    jobId: Guid;
    jobCode:string;
    jobTitle:string;
    jobDescription:string;
    // postDate:Date;
    lastDate:Date;
    experience:string;
    degreeId : string;
    positionId : Guid;
    categoryId : Guid;
    typeId : Guid;
    locationId : Guid;
}






