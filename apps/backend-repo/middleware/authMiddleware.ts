import { Request, Response, NextFunction } from 'express';

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      res.status(401).send('Token must be provided');
      return;
    }

    next();
  } catch (error) {
    next(error);
  }

};

export default authMiddleware;