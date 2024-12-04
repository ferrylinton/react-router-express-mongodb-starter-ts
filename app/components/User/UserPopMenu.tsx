import * as Popover from '@radix-ui/react-popover';
import CloseIcon from '../../icons/CloseIcon';
import { DotMenuIcon } from '../../icons/DotMenuIcon';
import styles from './UserPopMenu.module.css';
import { useTranslation } from 'react-i18next';

type Props = {
	locked: boolean;
	toDetail: () => void;
	toUpdate: () => void;
	toPassword: () => void;
	toggleLockUser: () => void;
};

export const UserPopMenu = ({ locked, toDetail, toUpdate, toPassword, toggleLockUser }: Props) => {

	const { t } = useTranslation();

	return (
		<Popover.Root>
			<Popover.Trigger asChild>
				<button className={styles['dot-menu']} aria-label="User Pop Menu">
					<DotMenuIcon />
				</button>
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content
					className={styles['table-pop-menu']}
					sideOffset={-3}
					side="left"
					align="start"
				>
					<section>
						<button onClick={() => toggleLockUser()}>
							{t(locked ? 'unlock' : 'lock')}
						</button>
						<button onClick={() => toDetail()}>
							{t("detail")}
						</button>
						<button onClick={() => toUpdate()}>
							{t("modify")}
						</button>
						<button onClick={() => toPassword()}>
							{t("password")}
						</button>
					</section>

					<Popover.Close className={styles['popover-close']} aria-label="Close">
						<CloseIcon />
					</Popover.Close>

					<Popover.Arrow className={styles['popover-arrow']} />
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
};
