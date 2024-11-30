import { Link } from 'react-router';
import { useConfirmStore } from '../../hooks/confirm-store';
import { useAppContext } from '../../providers/AppProvider';
import { Button } from '../Button/Button';
import { ToggleMenu } from '../ToggleMenu/ToggleMenu';
import { CollapsibleMenuItem } from './CollapsibleMenuItem';
import styles from './Sidebar.module.css';

export const Sidebar = () => {
	const { loggedUser, logout, toggleSidebar, getSidebarState } = useAppContext();


	const { showConfirm, hideConfirm } = useConfirmStore();


	const handleLink = (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		toggleSidebar();
		console.log(event.currentTarget.pathname);
	};

	const okHandler = async () => {
		hideConfirm();
		logout();
	};

	const onClickLogout = () => {
		showConfirm("Logout?", okHandler);
	};

	if (loggedUser) {
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
							Home
						</Link>
						<CollapsibleMenuItem label={'Profile'}>
							<Link onClick={handleLink} to="/profile">
								View Profile
							</Link>
							<Link onClick={handleLink} to="/changepassword">
								Change Password
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
	} else {
		return null;
	}
};
