import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { data, Form, Link, useActionData } from 'react-router';
import { HOST } from '~/.server/config/constant';
import { generateMail, sendMail } from '~/.server/services/mail-service';
import { createPasswordToken } from '~/.server/services/password-token-service';
import { findUserByEmail } from '~/.server/services/user-service';
import { successMessage } from '~/.server/utils/message-util';
import { Button } from '~/components/Button/Button';
import { InputForm } from '~/components/Form/InputForm';
import i18next from '~/i18n/i18next.server';
import { ForgotPasswordSchema, RegisterSchema } from '~/validations/authenticate-schema';
import { getErrorsObject } from '~/validations/validation-util';
import { Route } from '../+types/root';


type ActionData = {
    errorMessage?: string
    validationError?: ValidationError
}


export const action = async ({ request }: Route.ActionArgs) => {
    const t = await i18next.getFixedT(request);
    const payload = Object.fromEntries(await request.formData());
    const validation = ForgotPasswordSchema.safeParse(payload);

    if (validation.success) {
        try {
            const { email } = validation.data;
			const user = await findUserByEmail(email);

			if (user) {
				const { username } = user;
				const { insertedId: token } = await createPasswordToken(username);
				const html = generateMail(`${HOST}/resetpassword?token=${token}`);
				await sendMail(email, html);
				return await successMessage(request, t("emailSent"), "/forgotpassword");
			} else {
				return data({ errorMessage: t('emailNotFound') });
			}
        } catch (error: any) {
            return data({ errorMessage: error.message });
        }
    } else {
        return data({ validationError: getErrorsObject(validation.error), user: payload });
    }
    
}

export default function ForgotPasswordRoute() {
    const { t } = useTranslation();

    const actionData = useActionData<ActionData>();

    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const [validationError, setValidationError] = useState<ValidationError | undefined>(undefined);

    useEffect(() => {

        if (actionData?.validationError) {
            setValidationError(actionData.validationError);
            setErrorMessage(undefined);
        }

        if (actionData?.errorMessage) {
            setErrorMessage(actionData.errorMessage);
            setValidationError(undefined);
        }
    }, [actionData]);

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
                        validationError={validationError}
                    />

                    <Button type="submit" variant="primary" size="big">
                        {t("forgotPassword")}
                    </Button>

                    <div className="flex justify-between uppercase">
                        <Link to="/register">
                            {t("register")}
                        </Link>
                        <Link to="/login">
                            {t("login")}
                        </Link>
                    </div>

                </Form>
            </div>
        </>
    );
}
