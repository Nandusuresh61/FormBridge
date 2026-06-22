import { Survey } from "../../domain/entities/Survey";
import { CreateSurveyDto } from "../dto/SurveyDto";
import { ICreateSurveyUseCase } from "../interfaces/usecase/ICreateSurveyUseCase";
import { ISurveyRepository } from "../../domain/repository/ISurveyRepository";
import { IRecaptchaVerificationUseCase } from "../interfaces/service/IRecaptchaVerificationUseCase";
import { AppError } from "../../shared/errors/AppError";
import { ErrorCode } from "../../shared/enums/ErrorCode";
import { AppMessages } from "../../shared/messages/AppMessages";
import { HttpStatusCode } from "../../shared/enums/StatusCode";
import { randomUUID } from "crypto";

export class CreateSurveyUseCase implements ICreateSurveyUseCase {
  constructor(
    private readonly _surveyRepo: ISurveyRepository,
    private readonly _captchaVerifier: IRecaptchaVerificationUseCase,
  ) {}
  async execute(data: CreateSurveyDto): Promise<Survey> {
    const isHuman = await this._captchaVerifier.execute(data.recaptchaToken);

    if (!isHuman) {
      throw new AppError(
        ErrorCode.NOTHUMAN,
        AppMessages.NOTAHUMAN,
        HttpStatusCode.BAD_REQUEST,
      );
    }

    // Check for duplicate submission by email
    const existingEmail = await this._surveyRepo.findByEmail(data.email);
    if (existingEmail) {
      throw new AppError(
        ErrorCode.SURVEY,
        AppMessages.EMAIL_EXISTS,
        HttpStatusCode.BAD_REQUEST,
      );
    }

    // Check for duplicate submission by phone number
    const existingPhone = await this._surveyRepo.findByPhoneNumber(data.phoneNumber);
    if (existingPhone) {
      throw new AppError(
        ErrorCode.SURVEY,
        AppMessages.PHONE_EXISTS,
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const survey = new Survey(
      randomUUID(),
      data.name,
      data.gender,
      data.nationality,
      data.email,
      data.phoneNumber,
      data.address,
      data.message,
      data.attachmentUrl || "",
    );

    const createdSurvery = await this._surveyRepo.create(survey);

    return createdSurvery;
  }
}
