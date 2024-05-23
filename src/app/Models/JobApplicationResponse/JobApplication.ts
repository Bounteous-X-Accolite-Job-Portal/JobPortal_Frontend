export interface JobApplication{
    applicationId?:string;
    jobId?: string;
    appliedOn:Date;
    candidateId?:string;
    closedJobId?:string;
    statusId:number;
}