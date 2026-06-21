import { ISurveyRepository } from "@/domain/repository/ISurveyRepository";
import { Survey } from "@/domain/entities/Survey";
import { IGetRecentSubmissionsUseCase } from "../interfaces/usecase/IGetRecentSubmissionsUseCase";

export class GetRecentSubmissionsUseCase implements IGetRecentSubmissionsUseCase {
  constructor(private readonly surveyRepo: ISurveyRepository) {}

  async execute(): Promise<Survey[]> {
    return this.surveyRepo.findAll();
  }
}
