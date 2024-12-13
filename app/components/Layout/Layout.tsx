import { useEffect } from 'react';
import { data, Outlet, useLoaderData } from 'react-router';
import { authenticate } from '~/.server/utils/auth-util';
import { commitSession, getUserSession } from '~/.server/utils/sessions';
import { Route } from '../../+types/root';
import { useToastContext } from '../../providers/ToastProvider';
import { ConfirmDialog } from '../ConfirmDialog/ConfirmDialog';
import { Navbar } from '../Navbar/Navbar';
import { Sidebar } from '../Sidebar/Sidebar';
import styles from './Layout.module.css';

export async function loader({ request }: Route.LoaderArgs) {
	await authenticate(request);
}

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

