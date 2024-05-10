import { Application } from "../Application";

export interface ApplicationResponse{
    status: number,
    message: string,
    application: Application
}