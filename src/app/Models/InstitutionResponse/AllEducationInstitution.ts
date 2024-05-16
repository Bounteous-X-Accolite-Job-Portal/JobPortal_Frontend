import { EducationInstitution } from "./EducationInstitution";

export interface AllEducationInstitution{
    status: string;
    response : string;
    educationInstitution : EducationInstitution[];
}