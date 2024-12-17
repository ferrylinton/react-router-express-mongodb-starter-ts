import { Suspense, useEffect, useState, useTransition } from 'react';
import { Await, LoaderFunctionArgs, useLoaderData, useNavigation } from 'react-router';
import { findUsers } from '~/.server/services/user-service';
import { isAuthenticated } from '~/.server/utils/auth-util';
import { SimpleErrorBoundary } from '~/components/SimpleErrorBoundary';
import { UserTable } from '~/components/User/UserTable';
import { UserTableSkeleton } from '~/components/User/UserTableSkeleton';


export const loader = async ({ request }: LoaderFunctionArgs) => {
    console.log("loader..................");
    await isAuthenticated(request, "/user");

    const { searchParams } = new URL(request.url);

    const requestParams: RequestParams = {
        column: searchParams.get("column") || undefined,
        keyword: searchParams.get("keyword") || undefined,
        page: parseInt(searchParams.get("page") || "0"),
        sort: searchParams.get("sort") || undefined,
    }

    const pageable = findUsers(requestParams);

    return { pageable };
};

export default function UserListRoute() {

    const navigation = useNavigation();

    const { pageable } = useLoaderData<typeof loader>();

    const [firstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        setFirstLoad(false);
    }, [])

    if (firstLoad || (navigation.state === 'loading' && navigation.location.pathname === "/user")) {
        return <UserTableSkeleton />;
    } else {
        return <Await
            resolve={pageable}
            errorElement={<SimpleErrorBoundary />}
            children={value => <UserTable pageable={value} />}
        />
    }
}
