import { useEffect, useState } from 'react';
import { ActionFunctionArgs, data, LoaderFunctionArgs, useActionData } from 'react-router';
import { createUser } from '~/.server/services/user-service';
import { authenticate } from '~/.server/utils/auth-util';
import { successMessage } from '~/.server/utils/message-util';
import { UserCreateForm } from '~/components/User/UserCreateForm';
import i18next from '~/i18n/i18next.server';
import { CreateUserSchema } from '~/validations/user-validation';
import { getErrorsObject } from '~/validations/validation-util';

export const loader = async ({request }: LoaderFunctionArgs) => {
    await authenticate(request, "/user/create");
};

export const action = async ({ request }: ActionFunctionArgs) => {
    const loggedUser = await authenticate(request, "/user/create");
    const t = await i18next.getFixedT(request);
    const payload = Object.fromEntries(await request.formData());
    const validation = CreateUserSchema.safeParse(payload);

    if (validation.success) {
        try {
            const { passwordConfirm, ...input } = validation.data;
            await createUser(input, loggedUser.username);
            return await successMessage(request, t("dataIsSaved", { arg: validation.data.username }), "/user");

        } catch (error: any) {
            return data({ errorMessage: error.message });
        }
    } else {
        return data({ validationError: getErrorsObject(validation.error), user: payload });
    }
}

export default function UserCreateRoute() {

    const actionData = useActionData<Partial<UserFormProps>>();

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
        <UserCreateForm 
         errorMessage={errorMessage} 
         validationError={validationError} />
    )
}
