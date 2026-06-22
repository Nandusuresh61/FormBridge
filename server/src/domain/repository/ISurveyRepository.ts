import { Survey } from "../entities/Survey";

export interface SurveyQueryOptions {
  page?: number;
  limit?: number;
  search?: string;
  gender?: string;
  nationality?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedSurveys {
  surveys: Survey[];
  total: number;
}

export interface ISurveyRepository {
  create(survey: Survey): Promise<Survey>;
  findAll(options?: SurveyQueryOptions): Promise<PaginatedSurveys>;
  findById(surveyId: string): Promise<Survey| null>;
  findByEmail(email: string): Promise<Survey | null>;
  findByPhoneNumber(phoneNumber: string): Promise<Survey | null>;
}

      