import { Interview } from "./Interview";

export interface AddInterviewResponse{
    status: number,
    message: string,
    interview: Interview
}