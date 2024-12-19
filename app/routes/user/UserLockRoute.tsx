import { ActionFunctionArgs, data, redirect } from "react-router";
import { updateUser } from "~/.server/services/user-service";
import { isAuthenticated } from "~/.server/utils/auth-util";
import { toast } from "~/.server/utils/message-util";
import i18next from "~/i18n/i18next.server";
import { UpdateUserSchema } from "~/validations/user-validation";

export const action = async ({ request, params }: ActionFunctionArgs) => {
    const loggedUser = await isAuthenticated(request, "/user");
    const t = await i18next.getFixedT(request);
    const payload = Object.fromEntries(await request.formData());
    const validation = UpdateUserSchema.safeParse(payload);

    if (validation.success) {
        try {
            const input = {
                id: params.id,
                updatedBy: loggedUser.username,
                updatedAt: new Date(),
                ...validation.data
            };

            if (loggedUser.username !== input.updatedBy) {
                input.updatedBy = loggedUser.username;
            }

            await updateUser(input);
            return await toast(t("dataIsUpdated", { arg: input.username }), "/user");
        } catch (error: any) {
            return data({ errorMessage: error.message });
        }
    }
}

export const loader = async () => redirect("/user");