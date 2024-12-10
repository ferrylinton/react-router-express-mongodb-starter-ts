type Theme = "light" | "dark"

type AppContextProps = {
	getSidebarState: () => boolean
	toggleSidebar: () => void
	locale: string
	setLocale: (locale: string) => void
}

type ToastType = "success" | "error"

type ToastData = { 
	message: string
	type: ToastType 
}

type ToastContextProps = {
	toast: (data: ToastData) => void
}