import { ActionFunctionArgs, data, LoaderFunctionArgs, useLoaderData } from 'react-router';
import { deleteUserById, findUserById } from '~/.server/services/user-service';
import { toast } from '~/.server/utils/message-util';
import { DataNotFound } from '~/components/DataNotFound/DataNotFound';
import { UserDetail } from '~/components/User/UserDetail';
import i18next from '~/i18n/i18next.server';


export const loader = async ({ params }: LoaderFunctionArgs) => {
    const user = await findUserById(params.id || "0")
    return data(user);
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
    const t = await i18next.getFixedT(request);
    const formData = await request.formData();
    const username = formData.get("username")?.valueOf() || "";

    try {
        await deleteUserById(params.id || "0");
        return await toast(t("dataIsDeleted", { arg: username }), "/user");
    } catch (error: any) {
        return data({ errorMessage: error.message });
    }
}

export default function UserDetailRoute() {

    const user = useLoaderData<typeof loader>();

    if(user){
        return <UserDetail user={user} />
    }else{
        return <DataNotFound/>
    }
    
}
