import clsx from 'clsx';
import { useConfirmStore } from '../../hooks/confirm-store';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import styles from './ConfirmDialog.module.css';
import { Button } from '../Button/Button';

export const ConfirmDialog = () => {
	const { message, show, hideConfirm, okHandler } = useConfirmStore();

	return (
		<AlertDialog.Root open={show} onOpenChange={() => hideConfirm()}>
			<AlertDialog.Portal>
				<AlertDialog.Overlay className={styles['alert-dialog-overlay']} />
				<AlertDialog.Content className={styles['alert-dialog-content']}>
					<AlertDialog.Title />
					<AlertDialog.Description>{message}</AlertDialog.Description>
					<section>
						<AlertDialog.Cancel asChild>
							<Button variant="secondary">
								Cancel
							</Button>
						</AlertDialog.Cancel>
						<AlertDialog.Action asChild>
							<Button variant="primary" onClick={() => okHandler()}>
								OK
							</Button>
						</AlertDialog.Action>
					</section>
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	);
};
