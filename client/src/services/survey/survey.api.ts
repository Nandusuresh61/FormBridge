import { API } from "../Api";
import type { SurveyFormValues } from "../../validators/survery.validator";

export const createSurvey = async (
  payload: SurveyFormValues & { recaptchaToken: string }
) => {
  const response = await API.post(
    "/surveys",
    payload
  );

  return response.data;
};