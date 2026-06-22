export class Admin {
  constructor(
    public readonly adminId: string,
    public readonly email: string,
    public readonly password: string,
    public readonly createdAt: Date = new Date()
  ) {}
}