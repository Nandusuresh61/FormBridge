export interface IRecaptchaVerificationUseCase {
  execute(token: string): Promise<boolean>;
}
