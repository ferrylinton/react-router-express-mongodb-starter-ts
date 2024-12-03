type Theme = 'light' | 'dark';

type AppContextProps = {
	getSidebarState: () => boolean;
	toggleSidebar: () => void;
	locale: string;
	setLocale: (locale: string) => void;
};

type ToastContextProps = {
	toast: (message: string, isError?: boolean) => void;
};
