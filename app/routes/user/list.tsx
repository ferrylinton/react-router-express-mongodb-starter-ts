import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { data, LoaderFunctionArgs, useLoaderData } from 'react-router';
import { findUsers } from '~/.server/services/user-service';
import { commitSession, getUserSession } from '~/.server/utils/sessions';
import { UserTable } from '~/components/User/UserTable';
import { useToastContext } from '~/providers/ToastProvider';


export const loader = async ({ request }: LoaderFunctionArgs) => {
    const session = await getUserSession(request);

    const flashData = session.get("data");

    const { searchParams } = new URL(request.url);

    const requestParams: RequestParams = {
        column: searchParams.get("column") || undefined,
        keyword: searchParams.get("keyword") || undefined,
        page: parseInt(searchParams.get("page") || "0"),
        sort: searchParams.get("sort") || undefined,
    }

    const pageable = await findUsers(requestParams);

    return data({ flashData, pageable }, {
        headers: {
            "Set-Cookie": await commitSession(session),
        },
    });
};

export default function UserListPage() {

    const { t } = useTranslation();

    const { flashData, pageable } = useLoaderData<typeof loader>();

    const { toast } = useToastContext();

    useEffect(() => {
        if (flashData) {
            console.log(flashData);
            const { message, arg } = flashData
            toast(t(message, { arg }));
        }
    }, [flashData])


    return (
        <UserTable pageable={pageable} />
    )
}
