import { useTranslation } from 'react-i18next';
import { useNavigate, useSubmit } from 'react-router';
import styles from '../../css/DataDetail.module.css';
import { useConfirmStore } from '../../hooks/confirm-store';
import { Button } from '../Button/Button';

type UserDetailProps = {
	user: Omit<User, 'password'> | null;
};

export const UserDetail = ({ user }: UserDetailProps) => {
	const { showConfirm, hideConfirm } = useConfirmStore();

	const submit = useSubmit();

	const { t } = useTranslation();

	const navigate = useNavigate();

	const okHandler = async () => {
		try {
			if (user) {
				submit(
					{ id: user.id, username: user.username },
					{ method: 'post', action: `/user/detail/${user.id}` }
				);
				hideConfirm();
			}
		} catch (error: any) {
			console.log(error);
		}
	};

	const onClickDelete = () => {
		if (user) {
			showConfirm(t('deleteData'), okHandler);
		}
	};

	if (user === null) {
		return <div>Not found</div>;
	} else {
		return (
			<>
				<div className={styles['data-detail']}>
					<table>
						<tbody>
							<tr>
								<th> {t('id')}</th>
								<td>{user.id}</td>
							</tr>
							<tr>
								<th>{t('email')}</th>
								<td>{user.email}</td>
							</tr>
							<tr>
								<th>{t('username')}</th>
								<td>{user.username}</td>
							</tr>
							<tr>
								<th>{t('locked')}</th>
								<td>{t(user.locked ? 'yes' : 'no')}</td>
							</tr>
							<tr>
								<th>{t('createdAt')}</th>
								<td>{user.createdAt.toDateString()}</td>
							</tr>
							<tr>
								<th>{t('updatedAt')}</th>
								<td>{user.updatedAt ? user.updatedAt.toDateString() : '-'}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="flex gap-1 mt-3">
					<Button minWidth={100} onClick={() => navigate('/user')}>
						{t('back')}
					</Button>
					<Button minWidth={100} variant="danger" onClick={onClickDelete}>
						{t('delete')}
					</Button>
				</div>
			</>
		);
	}
};
