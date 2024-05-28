export interface Experience{
    experienceId: string,
    experienceTitle: string,
    startDate: Date,
    endDate?: Date,
    isCurrentlyWorking: boolean,
    description: string,
    companyId: string
}