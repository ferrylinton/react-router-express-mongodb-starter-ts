import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { useTranslation } from 'react-i18next';
import { useConfirmStore } from '../../hooks/confirm-store';
import { Button } from '../Button/Button';
import styles from './ConfirmDialog.module.css';

export const ConfirmDialog = () => {

	const { t } = useTranslation();
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
								{t("cancel")}
							</Button>
						</AlertDialog.Cancel>
						<AlertDialog.Action asChild>
							<Button variant="primary" onClick={() => okHandler()}>
								{t("ok")}
							</Button>
						</AlertDialog.Action>
					</section>
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	);
};
