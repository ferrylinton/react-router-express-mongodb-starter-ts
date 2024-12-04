import { useTranslation } from 'react-i18next';
import { Button } from '../Button/Button';
import { InputForm } from '../Form/InputForm';
import { SelectRole } from '../Select/SelectRole';
import { Form } from 'react-router';


export const UserCreateForm = ({ user, validationError, errorMessage }: UserFormProps) => {
	const { t } = useTranslation();

	return (
		<>
			<div className="container-center">
				<Form
					method="post"
					noValidate
					autoComplete="off"
					className="form"
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
