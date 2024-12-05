
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

	const toastMessage = session.get("toastMessage");

	if (toastMessage) {
		return data(
			{ toastMessage },
			{ headers: { "Set-Cookie": await commitSession(session) } },
		);
	}
}

export default function PublicLayout() {

	const loaderData = useLoaderData<typeof loader>();

	const { toast } = useToastContext();

	useEffect(() => {

		if (loaderData && loaderData.toastMessage) {
			const { message, type } = loaderData.toastMessage;
			toast(message, type === "error");
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
