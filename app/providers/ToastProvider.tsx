import * as Toast from '@radix-ui/react-toast';
import { PropsWithChildren, createContext, useContext, useState } from 'react';
import CloseIcon from '../icons/CloseIcon';
import styles from './ToastProvider.module.css';

export const ToastContext = createContext<ToastContextProps>({
	toast: () => Function(),
});

export const ToastProvider = ({ children }: PropsWithChildren) => {
	const [open, setOpen] = useState(false);

	const [toastData, setToastData] = useState<ToastData>();

	const toast = (toastData: ToastData) => {
		setToastData(toastData);
		setOpen(true);
	};
	return (
		<ToastContext.Provider value={{ toast }}>
			<Toast.Provider duration={15000}>
				{children}
				<Toast.Root
					className={styles.ToastRoot}
					data-type={toastData?.type}
					open={open}
					onOpenChange={setOpen}
				>
					<Toast.Description asChild>
						<p>{toastData?.message}</p>
					</Toast.Description>
					<Toast.Close aria-label="Close">
						<CloseIcon />
					</Toast.Close>
				</Toast.Root>
				<Toast.Viewport className={styles.ToastViewport} />
			</Toast.Provider>
		</ToastContext.Provider>
	);
};

export const useToastContext = () => useContext(ToastContext);
