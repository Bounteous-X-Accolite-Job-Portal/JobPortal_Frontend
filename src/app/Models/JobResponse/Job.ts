import { Degree } from "../DegreeResponse/Degree";
import { JobCategory } from "../JobCategoryResponse/JobCategory";
import { position } from "../JobPositionResponse/position";
import { JobType } from "../JobTypeResponse/JobType";
import { location } from "../JoblocationResponse/location";
import { Guid } from "guid-typescript";

export interface Job{
    categoryId : string;
    degreeId : string;
    empId: string;
    experience:string;
    jobCode:string;
    jobDescription:string;
    jobId: string;
    jobTitle:string;
    jobType : string;
    lastDate: Date;
    locationId : string;
    positionId : string;
    postDate:Date;
}