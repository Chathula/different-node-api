import { Request, Response, NextFunction } from 'express';

export const errorHandler = () => {
  return (err : any, req : Request, res : Response, next : NextFunction) => {
    if (typeof err.isJoi !== 'undefined' && err.isJoi) {
          const errors: Array<string> = [];
          for (const error of err.details) {
              errors.push(error.message);
          }

          return  res.status(400).json({ success: false, errors });
      }

      return res.status(400).json({ success: false, errors: 'Something went wrong' });
  }
}