import { EducationInstitution } from "../InstitutionResponse/EducationInstitution";

export interface candidateEducation {
    educationId?: string;
    institutionOrSchoolName?: string;
    startYear: number;
    endYear: number;
    grade: string;
    institutionId?: string;
    degreeId?: string;
    candidateId?: string;
}