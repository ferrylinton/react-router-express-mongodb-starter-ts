import clsx from 'clsx';
import { useAppContext } from '../../providers/AppProvider';
import styles from './ToggleMenu.module.css';

type ToggleMenuProps = {
	className?: string;
};

export const ToggleMenu = ({ className }: ToggleMenuProps) => {
	const { toggleSidebar, getSidebarState } = useAppContext();

	return (
		<button
			className={clsx(className, styles['toggle-menu'])}
			data-show={getSidebarState()}
			onClick={() => toggleSidebar()}
		>
			<span></span>
			<span></span>
			<span></span>
		</button>
	);
};
