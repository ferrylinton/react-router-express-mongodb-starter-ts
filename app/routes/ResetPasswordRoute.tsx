import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { data, Form, Link, LoaderFunctionArgs, useActionData, useLoaderData } from 'react-router';
import { findTokenById } from '~/.server/services/password-token-service';
import { changePassword } from '~/.server/services/user-service';
import { toast } from '~/.server/utils/message-util';
import { Button } from '~/components/Button/Button';
import { InputForm } from '~/components/Form/InputForm';
import i18next from '~/i18n/i18next.server';
import { ResetPasswordSchema } from '~/validations/authenticate-schema';
import { getErrorsObject } from '~/validations/validation-util';
import { Route } from '../+types/root';
import styles from '~/components/Form/Form.module.css';


type ActionData = {
    errorMessage?: string
    validationError?: ValidationError
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    return data({ token });
};

export const action = async ({ request }: Route.ActionArgs) => {
    const t = await i18next.getFixedT(request);
    const payload = Object.fromEntries(await request.formData());
    const validation = ResetPasswordSchema.safeParse(payload);

    if (validation.success) {
        try {
            const passwordToken = await findTokenById(validation.data.token);

            if (passwordToken) {
                const input = {
                    username: passwordToken.username,
                    password: validation.data.password,
                    updatedBy: passwordToken.username,
                    updatedAt: new Date(),
                };

                await changePassword(input);
                return await toast(t("dataIsSaved", { arg: passwordToken.username }), "/login");
            } else {
                return data({ errorMessage: t("invalidToken") });
            }
        } catch (error: any) {
            return data({ errorMessage: error.message });
        }
    } else {
        return data({ validationError: getErrorsObject(validation.error), user: payload });
    }
}

export default function ResetPasswordRoute() {
    const { t } = useTranslation();

    const { token } = useLoaderData<typeof loader>();

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
                        name="token"
                        value={token || ""}
                        readOnly
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
                        {t("changePassword")}
                    </Button>

                    <div className="flex justify-between uppercase">
                        <Link to="/login">
                            {t("login")}
                        </Link>
                        <Link to="/forgotpassword">
                            {t("forgotPassword")}
                        </Link>
                    </div>

                </Form>
            </div>
        </>
    );
}
