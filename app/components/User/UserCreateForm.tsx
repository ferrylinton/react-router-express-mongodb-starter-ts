import { useTranslation } from 'react-i18next';
import { Button } from '../Button/Button';
import { InputForm } from '../Form/InputForm';
import { SelectRole } from '../Form/SelectRole';
import { Form } from 'react-router';
import styles from '~/components/Form/Form.module.css';


export const UserCreateForm = ({ user, validationError, errorMessage }: Partial<UserFormProps>) => {
	const { t } = useTranslation();

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
						defaultValue={user?.email}
						validationError={validationError}
					/>

					<InputForm
						type="text"
						maxLength={20}
						name="username"
						validationError={validationError}
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

					<SelectRole />

					<Button type="submit" variant="primary" size="big">
						{t("create")}
					</Button>
				</Form>
			</div>
		</>
	);
};
