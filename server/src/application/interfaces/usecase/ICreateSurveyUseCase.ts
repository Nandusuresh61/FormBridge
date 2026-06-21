import { CreateSurveyDto } from "@/application/dto/SurveyDto";
import { Survey } from "@/domain/entities/Survey";


export interface ICreateSurveyUseCase {
  execute(data: CreateSurveyDto): Promise<Survey>;
}
