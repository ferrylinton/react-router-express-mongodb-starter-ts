import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import { useSubmit } from 'react-router';
import { TriangleDown } from '~/icons/TriangleDown';
import { TriangleUp } from '~/icons/TriangleUp';
import { UserIcon } from '~/icons/UserIcon';
import { useConfirmStore } from '../../hooks/confirm-store';
import styles from './Dropdown.module.css';

export const ProfileMenu = () => {
	const submit = useSubmit();
	const [open, setOpen] = useState<boolean>(false);

	const { showConfirm, hideConfirm } = useConfirmStore();


	const handleLink = (pathname: string) => {
		console.log(pathname);
	};

	const okHandler = async () => {
		hideConfirm();
		submit(null, { method: "post", action: "/logout" })
	};

	const onClickLogout = () => {
		showConfirm("Logout?", okHandler);
	};

	return (
		<DropdownMenu.Root open={open} onOpenChange={() => setOpen(!open)}>
			<DropdownMenu.Trigger asChild>
				<button className={styles['dropdown-menu-trigger']} aria-label="Customise options">
					<UserIcon />
					{open ? <TriangleUp /> : <TriangleDown />}
				</button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content
					className={styles['dropdown-menu-content']}
					sideOffset={5}
					align="end"
				>
					<DropdownMenu.Item onClick={() => handleLink('/profile')}>
						Profile
					</DropdownMenu.Item>
					<DropdownMenu.Item onClick={() => handleLink('/changepassword')}>
						ChangePassword
					</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Item onClick={onClickLogout}>
						Logout
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
};
