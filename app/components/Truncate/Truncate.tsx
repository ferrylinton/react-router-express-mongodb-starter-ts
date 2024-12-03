import * as Tooltip from '@radix-ui/react-tooltip';
import styles from './Truncate.module.css';

type Props = {
	content: string;
};
export const Truncate = ({ content }: Props) => {
	return (
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger asChild>
					<div text-truncate="true">{content}</div>
				</Tooltip.Trigger>
				<Tooltip.Portal>
					<Tooltip.Content className={styles['tooltip-content']} sideOffset={5}>
						<div>{content}</div>
						<Tooltip.Arrow className={styles['tooltip-arrow']} />
					</Tooltip.Content>
				</Tooltip.Portal>
			</Tooltip.Root>
		</Tooltip.Provider>
	);
};
