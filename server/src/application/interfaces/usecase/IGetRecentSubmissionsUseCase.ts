import { Survey } from "@/domain/entities/Survey";
import { SurveyQueryOptions } from "@/domain/repository/ISurveyRepository";

export interface PaginatedSubmissionsResponse {
  submissions: Survey[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IGetRecentSubmissionsUseCase {
  execute(options?: SurveyQueryOptions): Promise<PaginatedSubmissionsResponse>;
}

