import { ActionFunctionArgs, data, LoaderFunctionArgs, redirect, useActionData, useLoaderData } from 'react-router';
import { deleteUserById, findUserById } from '~/.server/services/user-service';
import { commitSession, getUserSession } from '~/.server/utils/sessions';
import { UserDetail } from '~/components/User/UserDetail';


export const loader = async ({ params }: LoaderFunctionArgs) => {
    const user = await findUserById(params.id || "0")
    return data(user);
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const username = formData.get("username")?.valueOf() || "";

    try {
        await deleteUserById(params.id || "0");
        const session = await getUserSession(request);
        session.flash("data", { message: "dataIsDeleted", arg: username as string });
        return redirect("/user", {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });
    } catch (error: any) {
        return data({ errorMessage: error.message });
    }
}

export default function UserDetailRoute() {

    const user = useLoaderData<typeof loader>();

    const deleteResult = useActionData<KeyValue>();

    return (
        <UserDetail user={user} />
    )
}
