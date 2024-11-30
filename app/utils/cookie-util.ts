import Cookies from 'js-cookie';
import { LOGGED_USER_COOKIE } from './constant';

export const getLoggedUser = (): LoggedUser | null => {
	const str = Cookies.get(LOGGED_USER_COOKIE);

	if (str) {
		try {
			const loggedUser = JSON.parse(str as string) as LoggedUser;
			if (loggedUser && loggedUser.role && loggedUser.token && loggedUser.username) {
				return loggedUser;
			}
		} catch (error) {
			console.error(error);
		}
	}

	return null;
};
