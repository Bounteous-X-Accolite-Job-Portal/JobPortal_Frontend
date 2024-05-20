import { ApplicantData } from "./ApplicantData";

export interface ApplicantResponse{
    status: number,
    message: string,
    applicants: ApplicantData[]
}