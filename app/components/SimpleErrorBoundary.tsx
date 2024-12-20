import { isRouteErrorResponse, useAsyncError } from 'react-router';
import { WarningIcon } from '~/icons/WarningIcon';

export const SimpleErrorBoundary = () => {
	const error = useAsyncError() as any;

	return (
		<div className="w-full h-full flex justify-center items-center">
			<div className="text-red-600">
				<WarningIcon />
				{isRouteErrorResponse(error) ? (
					<p>
						{error.status} {error.statusText}
					</p>
				) : (
					<p>{error.response.data.message || error.message}</p>
				)}
			</div>
		</div>
	);
};
