import { useTranslation } from "react-i18next";
import { SearchForm } from "../SearchForm/SearchForm";
import styles from '../../css/DataList.module.css';
import { SkeletonSquare } from "../Skeleton/SkeletonSquare";



export const UserTableSkeleton = () => {

	const { t } = useTranslation();

	return (
		<>
			<div className="mt-8 mb-4">
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
