import { useTranslation } from 'react-i18next';
import { Form, useNavigate } from 'react-router';
import { Button } from '../Button/Button';
import { InputForm } from '../Form/InputForm';
import styles from '~/components/Form/Form.module.css';


export const UserPasswordForm = ({ user, validationError, errorMessage }: UserFormProps) => {
	const { t } = useTranslation();

	const navigate = useNavigate();

	return (
		<>
			<div className="h-full flex justify-center items-center">
				<Form
					method="post"
					noValidate
					autoComplete="off"
					className={styles["form"]}
				>
					{errorMessage && <p>{errorMessage}</p>}

					<InputForm
						type="text"
						maxLength={20}
						name="username"
						value={user.username}
						readOnly
					/>

					<InputForm
						type="password"
						maxLength={30}
						name="password"
						validationError={validationError}
					/>

					<InputForm
						type="password"
						maxLength={30}
						name="passwordConfirm"
						validationError={validationError}
					/>

					<div className="grid grid-cols-2 gap-1">
						<Button
							type="button"
							size="big"
							onClick={() => navigate('/user', { replace: true })}
						>
							{t("back")}
						</Button>
						<Button type="submit" variant="primary" size="big">
							{t("update")}
						</Button>
					</div>
				</Form>
			</div>
		</>
	);
};
