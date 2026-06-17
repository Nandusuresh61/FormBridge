import { Survey } from "../entities/Survey";

export interface ISurveyRepository {
  create(survey: Survey): Promise<Survey>;
  findAll(): Promise<Survey[]>;
  findById(surveyId: string): Promise<Survey| null>;
}
      