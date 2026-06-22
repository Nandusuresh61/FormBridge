import { LoginAdminDto } from "@/application/dto/AdminDto";
import { Admin } from "@/domain/entities/Admin";

export interface ILoginAdminUseCase {
  execute(dto: LoginAdminDto): Promise<{ admin: Admin; token: string }>;
}
