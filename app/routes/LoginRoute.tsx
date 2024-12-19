import { FormEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { data, Form, Link, LoaderFunctionArgs, redirect, useActionData, useNavigation, useSubmit } from 'react-router';
import { authenticate } from '~/.server/services/auth-service';
import { getLoggedUser, getReturnTo, setLoggedUser } from '~/.server/utils/auth-util';

import { Button } from '~/components/Button/Button';
import styles from '~/components/Form/Form.module.css';
import { InputForm } from '~/components/Form/InputForm';
import i18next from '~/i18n/i18next.server';
import { AuthenticateSchema } from '~/validations/authenticate-schema';
import { getErrorsObject } from '~/validations/validation-util';
import { Route } from '../+types/root';
import { LoaderIcon } from '~/icons/LoaderIcon';

type ActionData = {
    errorMessage?: string
    validationError?: ValidationError
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const loggedUser = await getLoggedUser(request);

    if (loggedUser) {
        return redirect("/");
    }
}

export const action = async ({ request }: Route.ActionArgs) => {
    console.log("login ", new Date().toUTCString());
    await new Promise(r => setTimeout(r, 2000));
    const t = await i18next.getFixedT(request);
    const payload = Object.fromEntries(await request.formData());
    const validation = AuthenticateSchema.safeParse(payload);

    if (validation.success) {
        try {
            const { username, password } = validation.data;
            const loggedUser = await authenticate(username, password);

            if (typeof loggedUser === "object") {
                return redirect(getReturnTo(request), {
                    headers: {
                        "Set-Cookie": await setLoggedUser(loggedUser),
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

    const submit = useSubmit();

    const navigation = useNavigation();

    const actionData = useActionData<ActionData>();

    const [errorMessage, setErrorMessage] = useState<string | undefined>();

    const [validationError, setValidationError] = useState<ValidationError | undefined>();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(navigation.formAction !== "/login"){
            submit(event.currentTarget);
        }
    }

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
                    action="/login"
                    method="post"
                    onSubmit={handleSubmit}
                    noValidate
                    autoComplete="off"
                    className={styles["form"]}
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
						{navigation.formAction === "/login" ? <LoaderIcon /> : t("login")}
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
