import { Candidate } from "./Backend/Candidate";
import { Employee } from "./Backend/Employee";

export interface LoginResponse{
    status: number;
    message: string;
    token?: string;
    candidate?: Candidate;
    employee?: Employee;
}