import { IAdminRepository } from "@/domain/repository/IAdminRepository";
import { IPasswordHasher } from "../interfaces/service/IPasswordHasher";
import { ITokenService } from "../interfaces/service/ITokenService";
import { LoginAdminDto } from "../dto/AdminDto";
import { ILoginAdminUseCase } from "../interfaces/usecase/ILoginAdminUseCase";

export class LoginAdminUseCase implements ILoginAdminUseCase {
  constructor(
    private readonly adminRepository: IAdminRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly tokenService: ITokenService
  ) {}

  async execute(dto: LoginAdminDto) {
    const admin = await this.adminRepository.findByEmail(
      dto.email
    );

    if (!admin) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid =
      await this.passwordHasher.compare(
        dto.password,
        admin.password
      );

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token =
      this.tokenService.generateAccessToken({
        adminId: admin.adminId,
        email: admin.email,
      });

    return {
      admin,
      token,
    };
  }
}