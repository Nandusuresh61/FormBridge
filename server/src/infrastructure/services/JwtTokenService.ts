import { ITokenService } from "@/application/interfaces/service/ITokenService";
import jwt from "jsonwebtoken";

export class JwtTokenService implements ITokenService {
  generateAccessToken(payload: object): string {
    return jwt.sign(
      payload,
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      }
    );
  }

  verifyAccessToken(token: string): object {
    return jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as object;
  }
}