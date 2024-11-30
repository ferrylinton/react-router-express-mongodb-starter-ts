type Theme = 'light' | 'dark';

type AppContextProps = {
	getSidebarState: () => boolean;
	toggleSidebar: () => void;
	locale: string;
	setLocale: (locale: string) => void;
	loggedUser: LoggedUser | null;
	login: (loggedUser: LoggedUser) => void;
	logout: () => void;
};

type ToastContextProps = {
	toast: (message: string, isError?: boolean) => void;
};
