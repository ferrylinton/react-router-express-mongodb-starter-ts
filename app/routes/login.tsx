import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { data, Form, Link, LoaderFunctionArgs, Navigate, redirect, useActionData } from 'react-router';
import { generateToken } from '~/.server/services/auth-service';
import { commitSession, getUserSession } from '~/.server/utils/sessions';
import { Button } from '~/components/Button/Button';
import { InputForm } from '~/components/Form/InputForm';
import { getLoggedUser } from '~/utils/cookie-util';
import { AuthenticateSchema } from '~/validations/authenticate-schema';
import { getErrorsObject } from '~/validations/validation-util';
import type { Route } from "./+types/home";

type ActionData = {
    errorMessage?: string
    error?: ValidationError
}

export default function Login() {
    const { t } = useTranslation();

    const actionData = useActionData<ActionData>();

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [validationError, setValidationError] = useState<ValidationError | null>(null);

    useEffect(() => {
        if (actionData?.error) {
            setValidationError(actionData.error)
        }
    }, [actionData]);

    if (getLoggedUser()) {
        return <Navigate replace to="/" />;
    }

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

export async function loader({ request }: LoaderFunctionArgs) {
    const session = await getUserSession(request);

    if (session.has('loggedUser')) {
        return redirect("/");
    }
}

export async function action({ request }: Route.ActionArgs) {
    const payload = Object.fromEntries(await request.formData());
    const validation = AuthenticateSchema.safeParse(payload);

    const session = await getUserSession(request);

    if (validation.success) {
        console.log(validation.data);
        const { username, password } = validation.data;
        const loggedUser = await generateToken(username, password);


        if (loggedUser == null) {
            session.flash("error", "Invalid username/password");

            // Redirect back to the login page with errors.
            return redirect("/login", {
                headers: {
                    "Set-Cookie": await commitSession(session),
                },
            });
        }

        session.set("loggedUser", loggedUser);

        // Login succeeded, send them to the home page.
        return redirect("/", {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });
    } else {
        return data({ error: getErrorsObject(validation.error) });
    }
}