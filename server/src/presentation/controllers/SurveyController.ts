import { ICreateSurveyUseCase } from "../../application/interfaces/usecase/ICreateSurveyUseCase";
import { HttpStatusCode } from "../../shared/enums/StatusCode";
import { AppMessages } from "../../shared/messages/AppMessages";
import { ResponseHandler } from "../../shared/response/ResponseHandler";
import { Request, Response } from "express";
import { asyncHandler } from "../utils/AsyncHandler";
import { createSurveySchema } from "../../shared/validator/SurveyValidator";

export class SurveyController {
  constructor(
    private readonly _createSurveyUseCase: ICreateSurveyUseCase
  ) {}

  createSurvey = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const validatedData = createSurveySchema.parse(req.body);

      const survey = await this._createSurveyUseCase.execute(
        validatedData
      );

      ResponseHandler.success(res, {
        statusCode: HttpStatusCode.CREATED,
        message: AppMessages.SURVEY_CREATED,
        data: survey,
      });
    }
  );
}