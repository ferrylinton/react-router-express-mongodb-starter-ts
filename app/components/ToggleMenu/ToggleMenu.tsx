import clsx from 'clsx';
import { useAppContext } from '../../providers/AppProvider';
import styles from './ToggleMenu.module.css';

type ToggleMenuProps = {
	className?: string;
};

export const ToggleMenu = ({ className }: ToggleMenuProps) => {
	const { toggleSidebar, sidebarState } = useAppContext();

	return (
		<button
			className={clsx(className, styles['toggle-menu'])}
			data-state={sidebarState}
			onClick={() => toggleSidebar()}
		>
			<span></span>
			<span></span>
			<span></span>
		</button>
	);
};
