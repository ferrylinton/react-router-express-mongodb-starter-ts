import { useTranslation } from 'react-i18next';
import styles from '../../css/DataList.module.css';
import { useConfirmStore } from '../../hooks/confirm-store';
import { useToastContext } from '../../providers/ToastProvider';
import { Pager } from '../Pager/Pager';
import { SearchForm } from '../SearchForm/SearchForm';
import { UserPopMenu } from './UserPopMenu';
import { UserTableItem } from './UserTableItem';
import { useNavigate } from 'react-router';

type UserTableProps = {
	pageable: Pageable<Omit<User, 'password'>>;
};

export const UserTable = ({ pageable }: UserTableProps) => {

	const { t } = useTranslation();

	const { showConfirm, hideConfirm } = useConfirmStore();

	const { toast } = useToastContext();


	const navigate = useNavigate();

	const toDetail = (id: string) => {
		navigate(`/user/detail/${id}`);
	};

	const toModify = (id: string) => {
		navigate(`/user/modify/${id}`);
	};

	const toPassword = (id: string) => {
		navigate(`/user/password/${id}`);
	};

	const okHandler = async (user: Omit<User, 'password'>) => {
		try {

			toast(t('dataIsUpdated', { arg: user.username }));
			hideConfirm();
			navigate('/user', { replace: true });
		} catch (error: any) {
			toast(error.message, true);
			console.log(error);
		}
	};

	const toggleLockUser = (user: Omit<User, 'password'>) => {
		showConfirm(
			t(
				user.locked ? 'unlockUser' : 'lockUser',
				{ username: user.username }
			),
			() => okHandler(user)
		);
	};

	return (
		<>
			<div className={styles['data-toolbar']}>
				<SearchForm action="/user" />
			</div>
			<div className={styles['data-list']}>
				<div table-type="data">
					<table>
						<thead>
							<tr>
								<th>#</th>
								<th>
									{t("username")}
								</th>
								<th>
									{t("email")}
								</th>
								<th>
									{t("createdAt")}
								</th>
							</tr>
						</thead>
						<tbody>
							{pageable.pagination.total === 0 && (
								<tr>
									<td colSpan={4}>
										<div className="no-records">
											{t("noRecords")}
										</div>
									</td>
								</tr>
							)}
							{pageable.data.map((user, index) => {
								return (
									<UserTableItem
										key={index}
										index={
											pageable.pagination.page * pageable.pagination.pageSize +
											index +
											1
										}
										user={user}
									/>
								);
							})}
						</tbody>
					</table>
				</div>
				<div table-type="action">
					<table>
						<thead>
							<tr>
								<th>&nbsp;</th>
							</tr>
						</thead>
						<tbody>
							{pageable.data.map((user, index) => {
								return (
									<tr key={index}>
										<td>
											<UserPopMenu
												locked={user.locked}
												toModify={() => toModify(user.id)}
												toDetail={() => toDetail(user.id)}
												toPassword={() => toPassword(user.id)}
												toggleLockUser={() => toggleLockUser(user)}
											/>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
			<Pager pagination={pageable.pagination} />
		</>
	);
};