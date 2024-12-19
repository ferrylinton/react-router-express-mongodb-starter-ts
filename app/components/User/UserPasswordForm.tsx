import { useTranslation } from 'react-i18next';
import { Form, useNavigate, useNavigation } from 'react-router';
import { Button } from '../Button/Button';
import { InputForm } from '../Form/InputForm';
import styles from '~/components/Form/Form.module.css';
import { LoaderIcon } from '~/icons/LoaderIcon';


export const UserPasswordForm = ({ user, validationError, errorMessage }: UserFormProps) => {
	const { t } = useTranslation();

	const navigate = useNavigate();

	const navigation = useNavigation();

	const action = `/user/password/${user.id}`

	return (
		<>
			<div className="h-full flex justify-center items-center">
				<Form
					action={action}
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
							{navigation.formAction === action ? <LoaderIcon /> : t("update")}
						</Button>
					</div>
				</Form>
			</div>
		</>
	);
};
