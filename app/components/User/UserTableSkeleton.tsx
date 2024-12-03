import { FormattedMessage } from 'react-intl';
import { SearchForm } from '../SearchForm/SearchForm';
import { SkeletonSquare } from '../Skeleton/SkeletonSquare';
import styles from '../../assets/css/DataList.module.css';

export const UserTableSkeleton = () => {
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
									<FormattedMessage id="username" />
								</th>
								<th>
									<FormattedMessage id="email" />
								</th>
								<th>
									<FormattedMessage id="createdAt" />
								</th>
							</tr>
						</thead>
						<tbody>
							{['1', '2'].map(num => {
								return (
									<tr key={num}>
										<td>{num}</td>
										<td>
											<SkeletonSquare width={130} height={20} />
										</td>
										<td>
											<SkeletonSquare width={130} height={20} />
										</td>
										<td>
											<SkeletonSquare width={130} height={20} />
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};
