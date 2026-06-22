import { IAdminRepository } from "../../domain/repository/IAdminRepository";
import { IPasswordHasher } from "../interfaces/service/IPasswordHasher";
import { ITokenService } from "../interfaces/service/ITokenService";
import { LoginAdminDto } from "../dto/AdminDto";
import { ILoginAdminUseCase } from "../interfaces/usecase/ILoginAdminUseCase";
import { AppError } from "../../shared/errors/AppError";
import { ErrorCode } from "../../shared/enums/ErrorCode";
import { HttpStatusCode } from "../../shared/enums/StatusCode";
import { AppMessages } from "../../shared/messages/AppMessages";

export class LoginAdminUseCase implements ILoginAdminUseCase {
  constructor(
    private readonly _adminRepository: IAdminRepository,
    private readonly _passwordHasher: IPasswordHasher,
    private readonly _tokenService: ITokenService
  ) { }

  async execute(dto: LoginAdminDto) {
    const admin = await this._adminRepository.findByEmail(
      dto.email
    );

    if (!admin) {
      throw new AppError(
        ErrorCode.AUTH,
        AppMessages.ADMIN_NOT_FOUND,
        HttpStatusCode.UNAUTHORIZED
      );
    }

    const isPasswordValid =
      await this._passwordHasher.compare(
        dto.password,
        admin.password
      );

    if (!isPasswordValid) {
      throw new AppError(
        ErrorCode.AUTH,
        AppMessages.INCORRECT_PASSWORD,
        HttpStatusCode.UNAUTHORIZED
      );
    }

    const token =
      this._tokenService.generateAccessToken({
        adminId: admin.adminId,
        email: admin.email,
      });

    return {
      admin,
      token,
    };
  }
}