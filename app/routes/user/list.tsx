import { data, LoaderFunctionArgs, useLoaderData } from 'react-router';
import { findUserList } from '~/.server/services/user-service';
import { UserTable } from '~/components/User/UserTable';


export const loader = async ({ request }: LoaderFunctionArgs) => {
    const { searchParams } = new URL(request.url);
    const requestParams: RequestParams = {
        column: searchParams.get("column") || undefined,
        keyword: searchParams.get("keyword") || undefined,
        page: parseInt(searchParams.get("page") || "0"),
        sort: searchParams.get("sort") || undefined,
    }

    const pageable = await findUserList(requestParams);

    return data(pageable);
};

export default function UserListPage() {

    const pageable = useLoaderData<typeof loader>();

    return (
        <UserTable pageable={pageable} />
    )
}
