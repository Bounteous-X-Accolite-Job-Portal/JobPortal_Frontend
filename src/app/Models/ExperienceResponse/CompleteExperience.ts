import { Company } from "../CompanyResponse/Company";
import { Experience } from "./Experience";

export interface CompleteExperience{
    experience: Experience,
    company: Company
}