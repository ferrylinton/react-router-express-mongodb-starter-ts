import * as Collapsible from '@radix-ui/react-collapsible';
import { ReactNode, useState } from 'react';
import { TriangleDown } from '../../icons/TriangleDown';
import { TriangleUp } from '../../icons/TriangleUp';
import styles from './Sidebar.module.css';

type Props = {
	label: string;
	children: ReactNode;
};

export const CollapsibleMenuItem = ({ label, children }: Props) => {
	const [open, setOpen] = useState(false);

	return (
		<Collapsible.Root open={open} onOpenChange={setOpen} className={styles['collapsible-menu']}>
			<Collapsible.Trigger asChild>
				<button>
					<span>{label}</span>
					{open ? <TriangleUp /> : <TriangleDown />}
				</button>
			</Collapsible.Trigger>
			<Collapsible.Content className={styles['collapsible-content']}>
				{children}
			</Collapsible.Content>
		</Collapsible.Root>
	);
};
