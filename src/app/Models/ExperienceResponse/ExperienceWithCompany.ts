import { Company } from "../Company";

export interface ExperienceWithCompany{
    experienceTitle: string,
    startDate: Date,
    endDate: Date,
    isCurrentlyWorking: boolean,
    description: string,
    Company: Company
}