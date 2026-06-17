import { Survey } from "@/domain/entities/Survey";
import { CreateSurveyDto } from "../dto/SurveyDto";

export interface ICreateSurveyUseCase {
  execute(data: CreateSurveyDto): Promise<Survey>;
}
