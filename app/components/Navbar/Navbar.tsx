import clsx from 'clsx';
import { Link } from 'react-router';
import { LanguageMenu } from '../Dropdown/LanguageMenu';
import { ProfileMenu } from '../Dropdown/ProfileMenu';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import { ToggleMenu } from '../ToggleMenu/ToggleMenu';
import styles from './Navbar.module.css';

export const Navbar = () => {
	return (
		<nav role="navigation" className={clsx(styles['navbar'])}>
			<div className="w-full flex justify-between items-center">
				<div className="flex items-center justify-center gap-2">
					<ToggleMenu className="md:hidden" />
					<Link to={'/'}>Home</Link>
				</div>
				<div className="flex gap-1 sm:gap-3">
					<ThemeSwitcher />
					<LanguageMenu />
					<ProfileMenu />
				</div>
			</div>
		</nav>
	);
};
