import { useEffect, useState } from 'react';
import { ActionFunctionArgs, data, LoaderFunctionArgs, useActionData, useLoaderData } from 'react-router';
import { changePassword, findUserById } from '~/.server/services/user-service';
import { isAuthenticated } from '~/.server/utils/auth-util';
import { toast } from '~/.server/utils/message-util';
import { UserPasswordForm } from '~/components/User/UserPasswordForm';
import i18next from '~/i18n/i18next.server';
import { ChangePasswordSchema } from '~/validations/user-validation';
import { getErrorsObject } from '~/validations/validation-util';


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    await isAuthenticated(request, `/user/password/${params.id}`)
    const user = await findUserById(params.id || "0")
    return data(user);
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
    const loggedUser = await isAuthenticated(request, `/user/password/${params.id}`)
    const t = await i18next.getFixedT(request);
    const payload = Object.fromEntries(await request.formData());
    const validation = ChangePasswordSchema.safeParse(payload);

    if (validation.success) {
        try {
            const { username, password } = validation.data;
			const input = {
				username,
				password,
				updatedBy: validation.data.username,
				updatedAt: new Date(),
			};

			if (loggedUser.username !== input.updatedBy) {
				input.updatedBy = loggedUser.username;
			}

            await changePassword(input);
            return await toast(request, t("dataIsUpdated", { arg: validation.data.username }), "/user");
        } catch (error: any) {
            return data({ errorMessage: error.message });
        }
    } else {
        return data({ validationError: getErrorsObject(validation.error) });
    }
}


export default function UserPasswordRoute() {

    const user = useLoaderData<Omit<User, "password"> | undefined>();

    const actionData = useActionData<UserFormProps>();

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

    if(user){
        return (
            <UserPasswordForm
                user={user}
                errorMessage={errorMessage}
                validationError={validationError} />
        )
    }else{
        return (
            <div>Not found</div>
        )
    }
    
}
