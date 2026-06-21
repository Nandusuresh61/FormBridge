import { SurveyRepository } from "../repositories/SurveyRepository";
import { GoogleRecaptchaVerifier } from "../services/GoogleRecaptchaVerifier";
import { CreateSurveyUseCase } from "../../application/usecases/CreateSurveyUseCase";
import { SurveyController } from "../../presentation/controllers/SurveyController";

// Instantiate infrastructural dependencies
const surveyRepository = new SurveyRepository();
const recaptchaVerifier = new GoogleRecaptchaVerifier();

// Inject dependencies into use cases
const createSurveyUseCase = new CreateSurveyUseCase(
  surveyRepository,
  recaptchaVerifier
);

// Inject use cases into controllers
export const surveyController = new SurveyController(createSurveyUseCase);
