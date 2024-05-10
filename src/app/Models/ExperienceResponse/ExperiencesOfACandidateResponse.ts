import { Experience } from "../Experience";

export interface ExperienceOfACandidateResponse{
    status: number,
    message: string,
    experiences : Experience[]
}