import { Employee } from "../Backend/Employee/Employee";
import { InterviewFeedback } from "../InterviewFeedback";
import { Interview } from "./Interview";

export interface ApplicantInterview{
    interview: Interview,
    interviewer: Employee,
    feedback?: InterviewFeedback
}