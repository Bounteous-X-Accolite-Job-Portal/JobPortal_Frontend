import { Guid } from 'guid-typescript';

export interface JobCategory {
  jobCategoryId: Guid;
  categoryCode: string;
  categoryName: string;
  description: string;
}
