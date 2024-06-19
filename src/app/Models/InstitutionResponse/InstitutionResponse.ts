import { EducationInstitution } from "./EducationInstitution";

export interface InstitutionResponse{
    status : number;
    message : string;
    educationInstitution : EducationInstitution;
}