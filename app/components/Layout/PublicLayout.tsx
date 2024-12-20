import clsx from 'clsx';
import { Outlet } from 'react-router';
import { AppProvider } from '../../providers/AppProvider';
import { ToastProvider } from '../../providers/ToastProvider';
import { PublicNavbar } from '../Navbar/PublicNavbar';
import styles from './Layout.module.css';

export default function PublicLayout() {
	return (
		<AppProvider>
			<ToastProvider>
				<div className={clsx(styles.layout, 'flex-col')}>
					<PublicNavbar />
					<Outlet />
				</div>
			</ToastProvider>
		</AppProvider>
	);
}
