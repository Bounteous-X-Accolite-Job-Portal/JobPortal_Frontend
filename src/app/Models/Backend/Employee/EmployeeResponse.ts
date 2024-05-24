import { Employee } from "./Employee";

export interface EmployeeResponse{
    status: number,
    message: string,
    employee: Employee
}