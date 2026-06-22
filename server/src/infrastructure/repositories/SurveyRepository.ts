import { Survey } from "../../domain/entities/Survey";
import { ISurveyRepository, SurveyQueryOptions, PaginatedSurveys } from "../../domain/repository/ISurveyRepository";
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

  async findAll(options: SurveyQueryOptions = {}): Promise<PaginatedSurveys> {
    const {
      page = 1,
      limit = 10,
      search = "",
      gender = "",
      nationality = "",
      sortBy = "createdAt",
      sortOrder = "desc",
    } = options;

    const query: any = {};

    if (search) {
      const searchRegex = new RegExp(search, "i");
      query.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { phoneNumber: searchRegex },
        { address: searchRegex },
        { message: searchRegex },
      ];
    }

    if (gender) {
      query.gender = gender;
    }

    if (nationality) {
      query.nationality = nationality;
    }

    const skip = (page - 1) * limit;

    const sort: any = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;

    const [surveys, total] = await Promise.all([
      SurveyModel.find(query).sort(sort).skip(skip).limit(limit).lean(),
      SurveyModel.countDocuments(query),
    ]);

    const mappedSurveys = surveys.map(
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

    return {
      surveys: mappedSurveys,
      total,
    };
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
