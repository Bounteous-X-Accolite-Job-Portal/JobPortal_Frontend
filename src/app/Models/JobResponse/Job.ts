import { Degree } from "../DegreeResponse/Degree";
import { JobCategory } from "../JobCategoryResponse/JobCategory";
import { position } from "../JobPositionResponse/position";
import { JobType } from "../JobTypeResponse/JobType";
import { location } from "../JoblocationResponse/location";
import { Guid } from "guid-typescript";

export interface Job{
    jobId: Guid;
    jobCode:string;
    jobTitle:string;
    jobDescription:string;
    postDate:Date;
    lastDate:Date;
    experience:string;
    degreeId : Degree;
    positionId : position;
    categoryId : JobCategory;
    typeId : JobType;
    locationId : location;
}