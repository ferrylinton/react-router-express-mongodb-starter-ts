import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '~/.server/config/constant';
import logger from '~/.server/config/winston';

type TokenData = Omit<LoggedUser, 'token'> & JwtPayload;

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	// logger.info(`originalUrl: ${req.originalUrl}`);
	// logger.info(req.method);
	// logger.info(req.body);
	// logger.info(JSON.stringify(req.params));
	// logger.info(JSON.stringify(req.headers));
	// console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

	next();
};
