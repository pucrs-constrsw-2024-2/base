import { NextFunction, Request, Response } from "express";

export class ControllerHandler {
  static handle = (controllerFunction: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await controllerFunction(req);
        res.json(result);
      } catch (error) {
        next(error);
      }
    };
  };
}
