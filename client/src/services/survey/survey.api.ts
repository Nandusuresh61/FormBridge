import { API } from "../Api";
import type { SurveyFormValues } from "../../validators/survery.validator";
import { API_ROUTES } from "../../constants/apiRoutes";

export const createSurvey = async (
  payload: SurveyFormValues & { recaptchaToken: string }
) => {
  const response = await API.post(
    API_ROUTES.SURVEY.CREATE,
    payload
  );

  return response.data;
};