import { EducationInstitution } from "./EducationInstitution"

export interface EducationInstitutionResponse{
    message: string
    status: string
    educationInstitution: EducationInstitution[];
}