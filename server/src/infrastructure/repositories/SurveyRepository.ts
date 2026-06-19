import { Survey } from "../../domain/entities/Survey";
import { ISurveyRepository } from "../../domain/repository/ISurveyRepository";
import { SurveyModel } from "../database/models/SurveyModel";

export class SurveyRepository implements ISurveyRepository {
  async create(survey: Survey): Promise<Survey> {
    const surveyDoc = await SurveyModel.create({
      surveyId: survey.surveyId,
      name: survey.name,
      gender: survey.gender,
      nationality: survey.nationality,
      email: survey.email,
      phoneNumber: survey.phoneNumber,
      address: survey.address,
      message: survey.message,
      attachmentUrl: survey.attachmentUrl,
    });

    return new Survey(
      surveyDoc.surveyId,
      surveyDoc.name,
      surveyDoc.gender,
      surveyDoc.nationality,
      surveyDoc.email,
      surveyDoc.phoneNumber,
      surveyDoc.address,
      surveyDoc.message,
      surveyDoc.attachmentUrl || undefined,
      surveyDoc.createdAt,
    );
  }

  async findAll(): Promise<Survey[]> {
    const surveys = await SurveyModel.find().lean();

    return surveys.map(
      (survey) =>
        new Survey(
          survey.surveyId,
          survey.name,
          survey.gender,
          survey.nationality,
          survey.email,
          survey.phoneNumber,
          survey.address,
          survey.message,
          survey.attachmentUrl || undefined,
          survey.createdAt,
        ),
    );
  }

  async findById(surveyId: string): Promise<Survey | null> {
    const survey = await SurveyModel.findOne({
      surveyId,
    }).lean();

    if (!survey) {
      return null;
    }

    return new Survey(
      survey.surveyId,
      survey.name,
      survey.gender,
      survey.nationality,
      survey.email,
      survey.phoneNumber,
      survey.address,
      survey.message,
      survey.attachmentUrl || undefined,
      survey.createdAt,
    );
  }

  async findByEmail(email: string): Promise<Survey | null> {
    const survey = await SurveyModel.findOne({
      email: email.toLowerCase(),
    }).lean();

    if (!survey) {
      return null;
    }

    return new Survey(
      survey.surveyId,
      survey.name,
      survey.gender,
      survey.nationality,
      survey.email,
      survey.phoneNumber,
      survey.address,
      survey.message,
      survey.attachmentUrl || undefined,
      survey.createdAt,
    );
  }

  async findByPhoneNumber(phoneNumber: string): Promise<Survey | null> {
    const survey = await SurveyModel.findOne({
      phoneNumber,
    }).lean();

    if (!survey) {
      return null;
    }

    return new Survey(
      survey.surveyId,
      survey.name,
      survey.gender,
      survey.nationality,
      survey.email,
      survey.phoneNumber,
      survey.address,
      survey.message,
      survey.attachmentUrl || undefined,
      survey.createdAt,
    );
  }
}
