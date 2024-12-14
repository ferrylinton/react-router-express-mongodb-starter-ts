import { useTranslation } from 'react-i18next';
import { Form, useNavigate } from 'react-router';
import { Button } from '../Button/Button';
import { InputForm } from '../Form/InputForm';
import { SelectRole } from '../Form/SelectRole';
import { Checkbox } from '../Form/Checkbox';
import styles from '~/components/Form/Form.module.css';


export const UserUpdateForm = ({ user, validationError, errorMessage }: UserFormProps) => {
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
						maxLength={50}
						name="email"
						defaultValue={user.email}
						validationError={validationError}
					/>

					<InputForm
						type="text"
						maxLength={20}
						name="username"
						defaultValue={user.username}
						validationError={validationError}
					/>

					<SelectRole defaultValue={user.role} />

					<Checkbox
						name="locked"
						label={t('locked')}
						checked={user.locked || false}
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
