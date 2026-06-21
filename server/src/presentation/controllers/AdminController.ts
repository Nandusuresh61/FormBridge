import { ILoginAdminUseCase } from "../../application/interfaces/usecase/ILoginAdminUseCase";
import { IGetRecentSubmissionsUseCase } from "../../application/interfaces/usecase/IGetRecentSubmissionsUseCase";
import { HttpStatusCode } from "../../shared/enums/StatusCode";
import { ResponseHandler } from "../../shared/response/ResponseHandler";
import { Request, Response } from "express";
import { asyncHandler } from "../utils/AsyncHandler";
import { loginAdminSchema } from "../../shared/validator/AdminValidator";
import { ADMIN_COOKIE_NAME } from "../../shared/constants/AdminCookie";
import { AppMessages } from "../../shared/messages/AppMessages";

export class AdminController {
  constructor(
    private readonly _loginAdminUseCase: ILoginAdminUseCase,
    private readonly _getRecentSubmissionsUseCase: IGetRecentSubmissionsUseCase
  ) {}

  login = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const validatedData = loginAdminSchema.parse(req.body);

      const result = await this._loginAdminUseCase.execute(validatedData);

      res.cookie(ADMIN_COOKIE_NAME, result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

      ResponseHandler.success(res, {
        statusCode: HttpStatusCode.OK,
        message: AppMessages.ADMIN_LOGIN_SUCCESS,
        data: {
          admin: {
            adminId: result.admin.adminId,
            email: result.admin.email,
          },
        },
      });
    }
  );

  logout = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      res.clearCookie(ADMIN_COOKIE_NAME, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      ResponseHandler.success(res, {
        statusCode: HttpStatusCode.OK,
        message: AppMessages.ADMIN_LOGOUT_SUCCESS,
      });
    }
  );

  getRecentSubmissions = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const submissions = await this._getRecentSubmissionsUseCase.execute();

      ResponseHandler.success(res, {
        statusCode: HttpStatusCode.OK,
        message: AppMessages.SUBMISSIONS_RETRIEVED,
        data: submissions,
      });
    }
  );
}