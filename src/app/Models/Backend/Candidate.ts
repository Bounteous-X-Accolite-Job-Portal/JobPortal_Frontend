import { Guid } from "guid-typescript";

export interface Candidate{
    candidateId: string,
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    addressLine1?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
}