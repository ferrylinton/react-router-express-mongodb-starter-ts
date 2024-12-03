import { data, LoaderFunctionArgs, useLoaderData } from 'react-router';

export const loader = async ({ request }: LoaderFunctionArgs) => {
    return data({ message: "UserCreatePage" });
};

export default function UserCreatePage() {

    const loaderData = useLoaderData<typeof loader>();

    return (
        <div>{loaderData.message}</div>
    )
}
