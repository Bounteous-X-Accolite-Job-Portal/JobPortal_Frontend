import { Company } from "./Company";

export interface CompanyResponse{
    status: number;
    message: string;
    company: Company;
}