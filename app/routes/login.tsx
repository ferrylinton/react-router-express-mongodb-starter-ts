import React, { useState } from 'react';
import type { Route } from "./+types/home";
import { useAppContext } from '~/providers/AppProvider';
import { data, Form, Link, Navigate, useActionData, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { AuthenticateSchema } from '~/validations/authenticate-schema';
import { Button } from '~/components/Button/Button';
import { InputForm } from '~/components/Form/InputForm';
import { getLoggedUser } from '~/utils/cookie-util';
import { getErrorsObject } from '~/validations/validation-util';



export default function Login() {
    const { t } = useTranslation();

    const data = useActionData<typeof action>();

    const navigate = useNavigate();

    const [validationError, setValidationError] = useState<ValidationError | null>(null);

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { login } = useAppContext();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage(null);
        setValidationError(null);

        const formData = new FormData(event.currentTarget);
        const payload = Object.fromEntries(formData.entries());
        const validation = AuthenticateSchema.safeParse(payload);

        if (validation.success) {
            try {
                console.log(validation.data);
                //const { data } = await axiosInstance.post<LoggedUser>(`/api/token`, payload);
                //login(data);
            } catch (error: any) {
                if (error.response.data) {
                    setErrorMessage(t(error.response.data.message));
                } else {
                    setErrorMessage(error.message);
                }
            }
        } else {
            setValidationError(getErrorsObject(validation.error));
        }
    };

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
                        validationError={data?.error}
                    />

                    <InputForm
                        type="password"
                        maxLength={30}
                        name="password"
                        validationError={data?.error}
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

export async function action({ request }: Route.ActionArgs) {
    const payload = Object.fromEntries(await request.formData());
    const validation = AuthenticateSchema.safeParse(payload);

    if (validation.success) {
        console.log(validation.data);
    } else {
        return data({ error: getErrorsObject(validation.error) });
    }
}