import { InputHTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Form.module.css';

type InputFormProps = {
	name: string;
	validationError?: ValidationError | undefined;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputForm = ({ name, validationError, ...otherProps }: InputFormProps) => {
	const { t } = useTranslation();

	return (
		<div className={styles['form-group']}>
			<input
				name={name}
				placeholder={t(name )}
				autoComplete="off"
				{...otherProps}
			/>
			<label>{t(name )}</label>
			{validationError?.[name] && <p>{t(validationError[name])}</p>}
		</div>
	);
};
