import { ISurveyRepository, SurveyQueryOptions } from "@/domain/repository/ISurveyRepository";
import { IGetRecentSubmissionsUseCase, PaginatedSubmissionsResponse } from "../interfaces/usecase/IGetRecentSubmissionsUseCase";

export class GetRecentSubmissionsUseCase implements IGetRecentSubmissionsUseCase {
  constructor(private readonly surveyRepo: ISurveyRepository) {}

  async execute(options: SurveyQueryOptions = {}): Promise<PaginatedSubmissionsResponse> {
    const page = options.page || 1;
    const limit = options.limit || 10;

    const { surveys, total } = await this.surveyRepo.findAll(options);

    return {
      submissions: surveys,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}

