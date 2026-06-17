import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";

export const validateRequest = (schema: ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    schema.parse(req.body);
    next();
  };
};
