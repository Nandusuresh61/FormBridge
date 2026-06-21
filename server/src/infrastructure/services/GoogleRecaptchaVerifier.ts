import { IRecaptchaVerificationUseCase } from "../../application/interfaces/IRecaptchaVerificationUseCase";
import axios from "axios";
import { Appconfig } from "../../config/AppConfig";

export class GoogleRecaptchaVerifier implements IRecaptchaVerificationUseCase {
  async execute(token: string): Promise<boolean> {
    const secret = Appconfig.RECAPTCHA_SECRET_KEY;

    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret,
          response: token,
        },
      },
    );

    return response.data.success;
  }
}
