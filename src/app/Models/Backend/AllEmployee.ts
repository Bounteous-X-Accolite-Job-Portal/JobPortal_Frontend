import { Employee } from "./Employee";

export interface AllEmployee{
    status: string,
    message: string,
    employees: Employee[];
}