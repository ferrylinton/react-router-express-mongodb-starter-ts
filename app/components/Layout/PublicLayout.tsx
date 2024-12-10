
import clsx from 'clsx';
import { useEffect } from 'react';
import { data, Outlet, useLoaderData } from 'react-router';
import { commitSession, getUserSession } from '~/.server/utils/sessions';
import { AppProvider } from '../../providers/AppProvider';
import { ToastProvider, useToastContext } from '../../providers/ToastProvider';
import { PublicNavbar } from '../Navbar/PublicNavbar';
import { Route } from './+types/Layout';
import styles from './Layout.module.css';

export async function loader({ request }: Route.LoaderArgs) {
	const session = await getUserSession(request);

	const toastData = session.get("toastData");

	if (toastData) {
		return data(
			{ toastData },
			{ headers: { "Set-Cookie": await commitSession(session) } },
		);
	}
}

export default function PublicLayout() {

	const loaderData = useLoaderData<typeof loader>();

	const { toast } = useToastContext();

	useEffect(() => {

		if (loaderData && loaderData.toastData) {
			toast(loaderData.toastData);
		}

	}, [loaderData]);

	return (
		<AppProvider>
			<ToastProvider>
				<div className={clsx(styles.layout, 'flex-col',)}>
					<PublicNavbar />
					<Outlet />
				</div>
			</ToastProvider>
		</AppProvider>
	);
}
