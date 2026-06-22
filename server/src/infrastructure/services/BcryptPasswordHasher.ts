import { IPasswordHasher } from "@/application/interfaces/service/IPasswordHasher";
import bcrypt from "bcryptjs";

export class BcryptPasswordHasher implements IPasswordHasher {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async compare(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
