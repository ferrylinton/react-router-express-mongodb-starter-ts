import { CheckIcon } from '../../icons/CheckIcon';
import styles from './Checkbox.module.css';
import { useState } from 'react';
import clsx from 'clsx';

type CheckboxProps = {
	name: string;
	label: string;
	checked: boolean;
	validationError: ValidationError | undefined;
};

export const Checkbox = ({ name, label, checked, validationError }: CheckboxProps) => {
	const [value, setValue] = useState(checked ? 'true' : 'false');

	const onCheckedChange = () => {
		setValue(value === 'true' ? 'false' : 'true');
	};

	return (
		<div className={clsx(styles['checkbox'])}>
			<button
				type="button"
				role="checkbox"
				onClick={() => onCheckedChange()}
				data-error={validationError?.[name] ? true : false}
			>
				{value === 'true' && <CheckIcon />}
			</button>
			<input type="hidden" name={name} tabIndex={-1} value={value} />
			<label htmlFor="locked">{label}</label>
		</div>
	);
};
