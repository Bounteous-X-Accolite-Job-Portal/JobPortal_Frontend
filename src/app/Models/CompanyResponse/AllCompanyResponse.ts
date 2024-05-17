import { Company } from "./Company";

export interface AllCompanyResponse{
    status: string;
    message: string;
    companies : Company[];
}