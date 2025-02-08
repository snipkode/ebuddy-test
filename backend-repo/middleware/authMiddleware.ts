import { Request, Response, NextFunction } from 'express';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  // Simple Validation Token is Required
  if (!token) {
    return res.status(401).send('Unauthorized');
  }
  
  next();
};

export default authMiddleware;