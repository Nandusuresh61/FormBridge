export class Survey {
  constructor(
    public readonly surveyId: string,
    public readonly name: string,
    public readonly gender: string,
    public readonly nationality: string,
    public readonly email: string,
    public readonly phoneNumber: string,
    public readonly address: string,
    public readonly message: string,
    public readonly attachmentUrl?: string,
    public readonly createdAt: Date = new Date(),
  ) {}
}
