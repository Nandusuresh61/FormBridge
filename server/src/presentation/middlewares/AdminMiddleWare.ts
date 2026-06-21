import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.cookies.formbridge_admin_token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    req.admin = payload;

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};