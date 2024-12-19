import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { data, Form, Link, useActionData } from 'react-router';
import { createUser } from '~/.server/services/user-service';
import { toast } from '~/.server/utils/message-util';
import { Button } from '~/components/Button/Button';
import { InputForm } from '~/components/Form/InputForm';
import i18next from '~/i18n/i18next.server';
import { RegisterSchema } from '~/validations/authenticate-schema';
import { getErrorsObject } from '~/validations/validation-util';
import { Route } from '../+types/root';
import styles from '~/components/Form/Form.module.css';


type ActionData = {
    errorMessage?: string
    validationError?: ValidationError
}


export const action = async ({ request }: Route.ActionArgs) => {
    const t = await i18next.getFixedT(request);
    const payload = Object.fromEntries(await request.formData());
    const validation = RegisterSchema.safeParse(payload);

    if (validation.success) {
        try {
            const { passwordConfirm, ...input } = validation.data;
            await createUser({ ...input, role: 'USER' });
            return await toast(t("dataIsSaved", { arg: validation.data.username }), "/register");

        } catch (error: any) {
            return data({ errorMessage: error.message });
        }
    } else {
        return data({ validationError: getErrorsObject(validation.error), user: payload });
    }
}

export default function RegisterRoute() {
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

                    <Button type="submit" variant="primary" size="big">
                        {t("register")}
                    </Button>

                    <div className="flex justify-center uppercase">
                        <Link to="/login">
                            {t("login")}
                        </Link>
                    </div>

                </Form>
            </div>
        </>
    );
}
