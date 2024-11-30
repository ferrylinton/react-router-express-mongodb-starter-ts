import { useAppContext } from '../../providers/AppProvider';
import { LanguageMenu } from '../Dropdown/LanguageMenu';
import { ProfileMenu } from '../Dropdown/ProfileMenu';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import { ToggleMenu } from '../ToggleMenu/ToggleMenu';
import styles from './Navbar.module.css';
import clsx from 'clsx';
import { Link } from 'react-router';

export const Navbar = () => {
	const { loggedUser } = useAppContext();

	return (
		<nav className={clsx(styles['navbar'])}>
			<div className={styles['logged']}>
				<div className="flex items-center justify-center gap-2">
					{loggedUser && <ToggleMenu className="md:hidden" />}
					<Link to={'/'}>
						Home
					</Link>
				</div>
				<div className="flex gap-1 sm:gap-3">
					<ThemeSwitcher />
					<LanguageMenu />
					{loggedUser && <ProfileMenu />}
				</div>
			</div>
		</nav>
	);
};
