import { PropsWithChildren, createContext, useContext, useState } from 'react';


const defaultValue: AppContextProps = {
	sidebarState: "close",
	toggleSidebar: () => Function()
};

export const AppContext = createContext<AppContextProps | undefined>(defaultValue);

export const AppProvider = ({ children }: PropsWithChildren) => {

	const [sidebarState, setSidebarState] = useState<SidebarState>(defaultValue.sidebarState);

	const toggleSidebar = () => {
		setSidebarState(sidebarState === "open" ? "close" : "open");
	};

	const value: AppContextProps = {
		sidebarState,
		toggleSidebar
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
