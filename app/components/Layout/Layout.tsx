import { data, Outlet, useLoaderData } from 'react-router';
import { AppProvider } from '../../providers/AppProvider';
import { ToastProvider } from '../../providers/ToastProvider';
import { ConfirmDialog } from '../ConfirmDialog/ConfirmDialog';
import { Navbar } from '../Navbar/Navbar';
import { Sidebar } from '../Sidebar/Sidebar';
import styles from './Layout.module.css';
import { Route } from '../../+types/root';
import { authenticate } from '~/.server/utils/auth-util';

export default function Layout() {

	const loaderData = useLoaderData<typeof loader>();

	console.log(loaderData);

	return (
		<AppProvider>
			<ToastProvider>
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
			</ToastProvider>
		</AppProvider>
	);
}

export async function loader({ request }: Route.LoaderArgs) {
	console.log("layoutttttttttttttttttttt");
	const loggedUser =  await authenticate(request);
	return data(loggedUser);
}