import * as Select from '@radix-ui/react-select';
import React, { useState } from 'react';
import { CheckIcon } from '../../icons/CheckIcon';
import styles from './Form.module.css';
import clsx from 'clsx';
import { TriangleUp } from '~/icons/TriangleUp';
import { TriangleDown } from '~/icons/TriangleDown';

type SelectRoleProps = {
	defaultValue?: string;
};

export const SelectRole = ({ defaultValue = 'USER' }: SelectRoleProps) => {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<Select.Root
			open={open}
			onOpenChange={() => setOpen(!open)}
			defaultValue={defaultValue}
			name="role"
		>
			<Select.Trigger className={styles['select-trigger']} aria-label="ROLE">
				<Select.Value />
				{open ? <TriangleUp /> : <TriangleDown />}
			</Select.Trigger>
			<Select.Portal>
				<Select.Content
					className={styles['select-content']}
					asChild={true}
					position="popper"
					side="bottom"
					sideOffset={5}
					align="start"
					alignOffset={5}
				>
					<Select.Viewport className="SelectViewport">
						<SelectItem value="USER">USER</SelectItem>
						<SelectItem value="ADMIN">ADMIN</SelectItem>
					</Select.Viewport>
				</Select.Content>
			</Select.Portal>
		</Select.Root>
	);
};

const SelectItem = React.forwardRef<HTMLDivElement, Select.SelectItemProps>(
	({ children, className, ...props }, forwardedRef) => {
		return (
			<Select.Item {...props} ref={forwardedRef} className={styles['select-item']}>
				<Select.ItemText>{children}</Select.ItemText>
				<Select.ItemIndicator className={styles['selectItem-indicator']}>
					<CheckIcon />
				</Select.ItemIndicator>
			</Select.Item>
		);
	}
);
