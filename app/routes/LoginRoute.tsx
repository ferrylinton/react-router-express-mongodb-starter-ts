import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { data, Form, Link, LoaderFunctionArgs, redirect, useActionData } from 'react-router';
import { generateToken } from '~/.server/services/auth-service';
import { commitSession, getUserSession } from '~/.server/utils/sessions';
import { Button } from '~/components/Button/Button';
import { InputForm } from '~/components/Form/InputForm';
import i18next from '~/i18n/i18next.server';
import { AuthenticateSchema } from '~/validations/authenticate-schema';
import { getErrorsObject } from '~/validations/validation-util';
import { Route } from '../+types/root';

type ActionData = {
    errorMessage?: string
    validationError?: ValidationError
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const session = await getUserSession(request);

    if (session.has('loggedUser')) {
        return redirect("/");
    }
}

export const action = async ({ request }: Route.ActionArgs) => {
    const session = await getUserSession(request);
    const t = await i18next.getFixedT(request);
    const payload = Object.fromEntries(await request.formData());
    const validation = AuthenticateSchema.safeParse(payload);

    if (validation.success) {
        try {
            const { username, password } = validation.data;
            const loggedUser = await generateToken(username, password);

            if (typeof loggedUser === "object") {
                session.set("loggedUser", loggedUser);
                return redirect("/", {
                    headers: {
                        "Set-Cookie": await commitSession(session),
                    },
                });
            } else {
                return data({ errorMessage: t(loggedUser) });
            }

        } catch (error: any) {
            return data({ errorMessage: error.message });
        }
    } else {
        return data({ validationError: getErrorsObject(validation.error) });
    }
}

export default function LoginRoute() {
    const { t } = useTranslation();

    const actionData = useActionData<ActionData>();

    const [errorMessage, setErrorMessage] = useState<string | undefined>();

    const [validationError, setValidationError] = useState<ValidationError | undefined>();

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

                    <Button type="submit" variant="primary" size="big">
                        {t("login")}
                    </Button>

                    <div className="flex justify-between uppercase">
                        <Link to="/register">
                            {t("register")}
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
