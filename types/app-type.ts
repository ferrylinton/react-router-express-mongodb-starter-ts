type Theme = "light" | "dark"

type SidebarState = "open" | "close"

type AppContextProps = {
	sidebarState: SidebarState
	toggleSidebar: () => void
}

type ToastType = "success" | "error"

type ToastData = { 
	message: string
	type: ToastType 
}

type ToastContextProps = {
	toast: (data: ToastData) => void
}