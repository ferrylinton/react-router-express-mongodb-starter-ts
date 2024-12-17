import { NextFunction, Request, Response } from 'express';
import { redirect } from 'react-router';
import logger from '~/.server/config/winston';
import { decrypt } from '~/.server/utils/encrypt-util';
import { LOGGED_USER_COOKIE, RETURN_TO } from '~/utils/constant';


const IGNORE_PATHS = ["/register", "/login", "/forgotpassword", "/resetpassword", "/__manifest"];

const isPublic = (path: string) => {
	for(let i=0; i< IGNORE_PATHS.length; i++){
		if(IGNORE_PATHS[i] === path){
			return true;
		}else if(`${IGNORE_PATHS[i]}.data` === path){
			return true;
		}
	}

	return false;
}

const redirectToLogin = (req: Request, res: Response) => {
	const path = req.path;
	const isDataRequest = path.endsWith(".data");

	res.cookie(RETURN_TO, path.replace(".data", ""), { maxAge: 1000 * 20, httpOnly: true });
	
	if(isDataRequest){
		redirect("/login");
	}else{
		return res.redirect('/login');
	}
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
	
	const encrypted = req.cookies[LOGGED_USER_COOKIE];
	const path = req.path;
	
	
	logger.info(req.method);
	logger.info(`originalUrl: ${req.originalUrl}`);
	logger.info(`path: ${path.endsWith(".data")}`);

	if(!isPublic(path) && !encrypted ){
		redirectToLogin(req, res);

	}else if(!isPublic(path) && encrypted){
		try {
			const plainText = await decrypt(encrypted);

			if(plainText){
				const loggedUser = JSON.parse(plainText) as LoggedUser;
				if(!loggedUser.role || !loggedUser.username){
					redirectToLogin(req, res);
				}
			}
			
		} catch (error) {
			logger.error(error);
			redirectToLogin(req, res);
		}
	}
	
	next();
};
