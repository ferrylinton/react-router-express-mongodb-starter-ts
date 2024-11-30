import * as Toast from '@radix-ui/react-toast';
import { PropsWithChildren, createContext, useContext, useState } from 'react';
import CloseIcon from '../icons/CloseIcon';
import styles from './ToastProvider.module.css';

export const ToastContext = createContext<ToastContextProps>({
	toast: () => Function(),
});

export const ToastProvider = ({ children }: PropsWithChildren) => {
	const [open, setOpen] = useState(false);

	const [message, setMessage] = useState('');

	const [isError, setIsError] = useState(false);

	const toast = (message: string, isError?: boolean) => {
		setIsError(isError || false);
		setMessage(message);
		setOpen(true);
	};

	const value: ToastContextProps = {
		toast,
	};

	return (
		<ToastContext.Provider value={value}>
			<Toast.Provider duration={5000}>
				{children}
				<Toast.Root
					className={styles.ToastRoot}
					data-state={isError}
					open={open}
					onOpenChange={setOpen}
				>
					<Toast.Description asChild>
						<p>{message}</p>
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
