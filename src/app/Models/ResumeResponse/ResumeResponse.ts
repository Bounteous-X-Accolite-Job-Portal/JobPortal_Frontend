import { Resume } from "../Resume";

export interface ResumeResponse{
  status: number,
  message: string,
  resume: Resume
}