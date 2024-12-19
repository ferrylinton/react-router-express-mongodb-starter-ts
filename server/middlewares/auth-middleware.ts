import { NextFunction, Request, Response } from 'express';
import { redirect } from 'react-router';
import { COOKIE_MAX_AGE } from '~/.server/config/constant';
import logger from '~/.server/config/winston';
import { decrypt } from '~/.server/utils/encrypt-util';
import { LOGGED_USER_COOKIE, RETURN_TO } from '~/utils/constant';

const PUBLIC_PATHS = ["/register", "/login", "/forgotpassword", "/resetpassword", "/__manifest"];

const isPublic = (req: Request) => {
	const path = req.path.replace(".data", "");

	for (let i = 0; i < PUBLIC_PATHS.length; i++) {
		if (PUBLIC_PATHS[i] === path) {
			return true;
		}
	}

	return false;
}

const redirectToLogin = async (req: Request, res: Response) => {
	const path = req.path;
	const isDataRequest = path.endsWith(".data");

	res.cookie(RETURN_TO, path.replace(".data", ""), { maxAge: 1000 * 20, httpOnly: true });
	await new Promise(r => setTimeout(r, 200));
	if (isDataRequest) {
		redirect("/login");
	} else {
		return res.redirect('/login');
	}
}

const isAuthenticated = async (req: Request, res: Response) => {
	try {
		const encrypted = req.cookies[LOGGED_USER_COOKIE];

		if (encrypted) {
			const plainText = await decrypt(encrypted);

			if (plainText) {
				const loggedUser = JSON.parse(plainText) as LoggedUser;
				if (!loggedUser.role || !loggedUser.username) {
					await redirectToLogin(req, res);
				}

				res.cookie(LOGGED_USER_COOKIE, encrypted, { maxAge: COOKIE_MAX_AGE * 1000, httpOnly: true });
			}
		} else {
			await redirectToLogin(req, res);
		}
	} catch (error) {
		logger.error(error);
		await redirectToLogin(req, res);
	}
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	logger.info(`Request :: "${req.path}" | "${req.method}"`)
	if (!isPublic(req)) {
		const encrypted = req.cookies[LOGGED_USER_COOKIE];

		if (encrypted) {
			isAuthenticated(req, res);
		} else {
			redirectToLogin(req, res);
		}
	}

	next();
};
