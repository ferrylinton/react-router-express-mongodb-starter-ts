import { Link, useFetcher, useNavigate, useSubmit } from 'react-router';
import { useConfirmStore } from '../../hooks/confirm-store';
import { useAppContext } from '../../providers/AppProvider';
import { Button } from '../Button/Button';
import { ToggleMenu } from '../ToggleMenu/ToggleMenu';
import { CollapsibleMenuItem } from './CollapsibleMenuItem';
import styles from './Sidebar.module.css';
import { useTranslation } from 'react-i18next';

export const Sidebar = () => {

	let { t } = useTranslation();

	const navigate = useNavigate();

	const submit = useSubmit()

	const { toggleSidebar, getSidebarState } = useAppContext();


	const { showConfirm, hideConfirm } = useConfirmStore();


	const handleLink = (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		toggleSidebar();
		navigate(event.currentTarget.pathname);
	};

	const okHandler = async () => {
		hideConfirm();
		submit(null, { method: "post", action: "/logout" })
	};

	const onClickLogout = () => {
		showConfirm("Logout?", okHandler);
	};

	return (
		<>
			<aside className={styles['sidebar']} data-show={getSidebarState()}>
				<div className={styles['sidebar-top']}>
					<a className="logo" href="/">
						<span>Simple</span>
						<span>Admin</span>
					</a>
					<ToggleMenu />
				</div>

				<div className={styles['sidebar-menu']}>
					<Link onClick={handleLink} to="/" className={styles['sidebar-link']}>
						{t("home")}
					</Link>
					<CollapsibleMenuItem label={'Profile'}>
						<Link onClick={handleLink} to="/profile">
						{t("profile")}
						</Link>
						<Link onClick={handleLink} to="/changepassword">
						{t("changePassword")}
						</Link>
					</CollapsibleMenuItem>
					<CollapsibleMenuItem label={'Todo'}>
						<Link onClick={handleLink} to="/todo">
							View Todoes
						</Link>
						<Link onClick={handleLink} to="/todo/create">
							Create Todo
						</Link>
					</CollapsibleMenuItem>
					<CollapsibleMenuItem label={'User'}>
						<Link onClick={handleLink} to="/user">
							View User
						</Link>
						<Link onClick={handleLink} to="/user/create">
							Create User
						</Link>
					</CollapsibleMenuItem>
				</div>
				<Button variant="primary" size="big" onClick={onClickLogout} className="m-2">
					Logout
				</Button>
			</aside>
			<div
				className={styles['sidebar-overlay']}
				data-show={getSidebarState()}
				onClick={() => toggleSidebar()}
			></div>
		</>
	);
};