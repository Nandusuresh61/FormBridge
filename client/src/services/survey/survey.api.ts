import { API } from "../Api";


export const createSurvey = async (
  payload: any
) => {
  const response = await API.post(
    "/surveys",
    payload
  );

  return response.data;
};