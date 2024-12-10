import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { DEFAULT_LOCALE } from '~/utils/constant';


const defaultValue: AppContextProps = {
	getSidebarState: () => true,
	toggleSidebar: () => Function(),
	locale: DEFAULT_LOCALE,
	setLocale: () => Function()
};

export const AppContext = createContext<AppContextProps | undefined>(defaultValue);

export const AppProvider = ({ children }: PropsWithChildren) => {

	const [locale, setCurrentLocale] = useState<string>(DEFAULT_LOCALE);

	const [showSidebar, setShowSidebar] = useState(false);

	const setLocale = (locale: string) => {
		setCurrentLocale(locale);
	};

	const toggleSidebar = () => {
		setShowSidebar(!showSidebar);
	};

	const getSidebarState = () => {
		return showSidebar;
	};

	const value: AppContextProps = {
		getSidebarState,
		toggleSidebar,
		locale,
		setLocale
	};

	return (
		<AppContext.Provider value={value}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	const context = useContext(AppContext)

	if (context === undefined) {
		throw new Error('useAppContext must be used within a AppProvider');
	}
	return context;
};
