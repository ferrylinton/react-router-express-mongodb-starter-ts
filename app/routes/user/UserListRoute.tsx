import { data, LoaderFunctionArgs, useLoaderData } from 'react-router';
import { findUsers } from '~/.server/services/user-service';
import { authenticate } from '~/.server/utils/auth-util';
import { UserTable } from '~/components/User/UserTable';


export const loader = async ({ request }: LoaderFunctionArgs) => {
    await authenticate(request, "/user");

    const { searchParams } = new URL(request.url);

    const requestParams: RequestParams = {
        column: searchParams.get("column") || undefined,
        keyword: searchParams.get("keyword") || undefined,
        page: parseInt(searchParams.get("page") || "0"),
        sort: searchParams.get("sort") || undefined,
    }

    const pageable = await findUsers(requestParams);

    return data({ pageable });
};

export default function UserListRoute() {

    const { pageable } = useLoaderData<typeof loader>();

    return (
        <UserTable pageable={pageable} />
    )
}
