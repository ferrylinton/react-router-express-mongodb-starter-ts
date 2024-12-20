import * as cookie from 'cookie';
import i18n from '~/i18n/i18n';

export const DEFAULT_THEME = 'light';

export const THEME = 'theme';

export const getCookieTheme = (request: Request) => {
	const cookies = cookie.parse(request.headers.get('Cookie') || '');
	return cookies.theme || DEFAULT_THEME;
};

export const findLocale = (request: Request): Promise<string | Array<string> | null> => {
	const cookies = cookie.parse(request.headers.get('Cookie') || '');
	const locale = cookies.locale || i18n.fallbackLng;
	return new Promise<string>(resolve => {
		resolve(locale);
	});
};
