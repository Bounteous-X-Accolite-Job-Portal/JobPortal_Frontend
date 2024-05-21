import { Degree } from "../DegreeResponse/Degree";
import { EducationInstitution } from "../InstitutionResponse/EducationInstitution";
import { candidateEducation } from "./candidateEducation";

export interface CompleteEducation{
    education: candidateEducation,
    institution: EducationInstitution,
    degree: Degree
}