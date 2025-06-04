import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import MESSAGE from "../constants/message.constant";

export const validate = (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error: any) {
      const details = error.details?.map((err: any) => err.message) || [];
      res.status(422).json({
        success: false,
        message: MESSAGE.ERROR.VALIDATION,
        errors: details
      });
    }
  };
};
