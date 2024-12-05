import { useEffect, useState } from 'react';
import { ActionFunctionArgs, data, LoaderFunctionArgs, useActionData, useLoaderData } from 'react-router';
import { findUserById, updateUser } from '~/.server/services/user-service';
import { authenticate } from '~/.server/utils/auth-util';
import { successMessage } from '~/.server/utils/message-util';
import { UserCreateForm } from '~/components/User/UserCreateForm';
import { UserUpdateForm } from '~/components/User/UserUpdateForm';
import i18next from '~/i18n/i18next.server';
import { UpdateUserSchema } from '~/validations/user-validation';
import { getErrorsObject } from '~/validations/validation-util';


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    await authenticate(request, `/user/create/${params.id}`)
    const user = await findUserById(params.id || "0")
    return data(user);
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
    const loggedUser = await authenticate(request, "/user/create");
    const t = await i18next.getFixedT(request);
    const payload = Object.fromEntries(await request.formData());
    const validation = UpdateUserSchema.safeParse(payload);

    if (validation.success) {
        try {
            const input = {
                id: params.id,
                updatedBy: validation.data.username,
                updatedAt: new Date(),
                ...validation.data,
            };

            if (loggedUser.username !== input.updatedBy) {
                input.updatedBy = loggedUser.username;
            }

            await updateUser(input);
            return await successMessage(request, t("dataIsUpdated", { arg: validation.data.username }), "/user");
        } catch (error: any) {
            return data({ errorMessage: error.message });
        }
    } else {
        return data({ validationError: getErrorsObject(validation.error) });
    }
}


export default function UserUpdateRoute() {

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
            <UserUpdateForm
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
