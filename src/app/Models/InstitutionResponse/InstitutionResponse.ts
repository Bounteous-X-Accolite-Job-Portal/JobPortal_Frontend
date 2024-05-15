import { EducationInstitution } from "./EducationInstitution";

export interface InstitutionResponse{
    status : string;
    message : string;
    educationInstitution : EducationInstitution;
}