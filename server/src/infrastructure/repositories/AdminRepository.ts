import { Admin } from "../../domain/entities/Admin";
import { IAdminRepository } from "../../domain/repository/IAdminRepository";
import { AdminModel } from "../database/models/AdminModel";

export class AdminRepository implements IAdminRepository {
  async findByEmail(email: string): Promise<Admin | null> {
    const adminDoc = await AdminModel.findOne({
      email: email.toLowerCase(),
    }).lean();

    if (!adminDoc) {
      return null;
    }

    return new Admin(
      adminDoc._id.toString(),
      adminDoc.email,
      adminDoc.password,
      (adminDoc as any).createdAt
    );
  }
}
