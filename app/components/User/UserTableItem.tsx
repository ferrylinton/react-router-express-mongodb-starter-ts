
import { formatToDate } from '~/utils/date-util';
import { Truncate } from '../Truncate/Truncate';

type Props = {
	index: number;
	user: Omit<User, 'password'>;
};

export const UserTableItem = ({ index, user }: Props) => {

	return (
		<>
			<tr data-locked={user.locked}>
				<td>{index} </td>
				<td>{user.username}</td>
				<td>
					<Truncate content={user.email} />
				</td>
				<td>
					{formatToDate(user.createdAt)}
				</td>
			</tr>
		</>
	);
};
