import { Outlet } from 'react-router';
import { ConfirmDialog } from '../ConfirmDialog/ConfirmDialog';
import { Navbar } from '../Navbar/Navbar';
import { Sidebar } from '../Sidebar/Sidebar';
import styles from './Layout.module.css';

export default function Layout() {
	return (
		<div className={styles.layout}>
			<Sidebar />
			<div className={styles['main-wrapper']}>
				<Navbar />
				<main>
					<ConfirmDialog />
					<Outlet />
				</main>
			</div>
		</div>
	);
}
