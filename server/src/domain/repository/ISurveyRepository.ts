import { Survey } from "../entities/Survey";

export interface ISurveyRepository {
  create(survey: Survey): Promise<Survey>;
  findAll(): Promise<Survey[]>;
  findById(surveyId: string): Promise<Survey| null>;
  findByEmail(email: string): Promise<Survey | null>;
  findByPhoneNumber(phoneNumber: string): Promise<Survey | null>;
}
      