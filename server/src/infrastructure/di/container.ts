import { SurveyRepository } from "../repositories/SurveyRepository";
import { AdminRepository } from "../repositories/AdminRepository";
import { GoogleRecaptchaVerifier } from "../services/GoogleRecaptchaVerifier";
import { BcryptPasswordHasher } from "../services/BcryptPasswordHasher";
import { JwtTokenService } from "../services/JwtTokenService";
import { CreateSurveyUseCase } from "../../application/usecases/CreateSurveyUseCase";
import { LoginAdminUseCase } from "../../application/usecases/LoginAdminUseCase";
import { GetRecentSubmissionsUseCase } from "../../application/usecases/GetRecentSubmissionsUseCase";
import { SurveyController } from "../../presentation/controllers/SurveyController";
import { AdminController } from "../../presentation/controllers/AdminController";

// Instantiate infrastructural dependencies
const surveyRepository = new SurveyRepository();
const adminRepository = new AdminRepository();
const recaptchaVerifier = new GoogleRecaptchaVerifier();
const passwordHasher = new BcryptPasswordHasher();
const tokenService = new JwtTokenService();

// Inject dependencies into use cases
const createSurveyUseCase = new CreateSurveyUseCase(
  surveyRepository,
  recaptchaVerifier
);

const loginAdminUseCase = new LoginAdminUseCase(
  adminRepository,
  passwordHasher,
  tokenService
);

const getRecentSubmissionsUseCase = new GetRecentSubmissionsUseCase(
  surveyRepository
);

// Inject use cases into controllers
export const surveyController = new SurveyController(createSurveyUseCase);
export const adminController = new AdminController(
  loginAdminUseCase,
  getRecentSubmissionsUseCase
);
