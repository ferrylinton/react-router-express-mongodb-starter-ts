import { NextFunction, Request, Response } from 'express';
import { redirect } from 'react-router';
import { COOKIE_MAX_AGE, SET_TIMEOUT } from '~/.server/config/constant';
import logger from '~/.server/config/winston';
import { delay } from '~/.server/utils/app-util';
import { decrypt } from '~/.server/utils/encrypt-util';
import { LOGGED_USER_COOKIE, RETURN_TO } from '~/utils/constant';

const PUBLIC_PATHS = ['/register', '/login', '/forgotpassword', '/resetpassword', '/__manifest'];

const isPublic = (req: Request) => {
	const path = req.path.replace('.data', '');

	for (let i = 0; i < PUBLIC_PATHS.length; i++) {
		if (PUBLIC_PATHS[i] === path) {
			return true;
		}
	}

	return false;
};

const redirectToLogin = async (req: Request, res: Response) => {
	const path = req.path;
	const isDataRequest = path.endsWith('.data');

	res.cookie(LOGGED_USER_COOKIE, '', { maxAge: 0, httpOnly: true });
	res.cookie(RETURN_TO, path.replace('.data', ''), { maxAge: 1000 * 20, httpOnly: true });
	await delay();

	if (isDataRequest) {
		redirect('/login');
	} else {
		return res.redirect('/login');
	}
};

const isAuthenticated = async (req: Request, res: Response) => {
	try {
		const encrypted = req.cookies[LOGGED_USER_COOKIE];

		if (encrypted) {
			const plainText = await decrypt(encrypted);

			if (plainText) {
				const loggedUser = JSON.parse(plainText) as LoggedUser;

				if (loggedUser.role && loggedUser.username) {
					return true;
				}

				res.cookie(LOGGED_USER_COOKIE, encrypted, {
					maxAge: COOKIE_MAX_AGE * 1000,
					httpOnly: true,
				});
			}
		}
	} catch (error) {
		logger.error(error);
	}

	return false;
};

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	logger.info(`Request :: "${req.path}" | "${req.method}"`);

	if (!isPublic(req)) {
		const authencticated = await isAuthenticated(req, res);

		if (!authencticated) {
			return redirectToLogin(req, res);
		}
	}

	next();
};
