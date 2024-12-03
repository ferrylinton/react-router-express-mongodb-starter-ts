import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { FirstIcon } from '../../icons/FirstIcon';
import { LastIcon } from '../../icons/LastIcon';
import { NextIcon } from '../../icons/NextIcon';
import { PreviousIcon } from '../../icons/PreviousIcon';
import styles from './Pager.module.css';
import { useNavigate } from 'react-router';

export const Pager = ({ pagination, keyword }: Omit<Pageable<User>, 'data'>) => {
	const navigate = useNavigate();

	const [numbers, setNumbers] = useState([1]);

	const generateNumbers = (start: number, end: number) => {
		const newNumbers = [];
		for (let i = start; i < end; i++) {
			newNumbers.push(i);
		}
		setNumbers(newNumbers);
	};

	const handlePageChange = (page: number) => {
		if (page === pagination?.page || page < 0 || page + 1 > pagination.totalPage) {
			return false;
		}

		if (keyword) {
			navigate(
				`/user?keyword=${encodeURIComponent(keyword)}&page=${encodeURIComponent(page)}`
			);
		} else {
			navigate(`/user?page=${encodeURIComponent(page)}`, { replace: true });
		}
	};

	useEffect(() => {
		let start = 0;
		let end = 0;

		if (pagination.totalPage <= 5) {
			end = pagination.totalPage;
		} else if (pagination.page < 3) {
			end = 5;
		} else if (pagination.totalPage - pagination.page < 3) {
			start = pagination.totalPage - 5;
			end = pagination.totalPage;
		} else {
			start = pagination.page - 2;
			end = pagination.page + 3;
		}

		generateNumbers(start, end);
	}, [pagination]);

	if (pagination.totalPage < 2) {
		return null;
	} else {
		return (
			<>
				<div className={styles['pagination']}>
					<button onClick={() => handlePageChange(0)} disabled={pagination.page === 0}>
						<FirstIcon />
					</button>
					<button
						onClick={() => handlePageChange(pagination.page - 1)}
						disabled={pagination.page === 0}
					>
						<PreviousIcon />
					</button>
					<ul>
						{numbers.map((num, index) => {
							return (
								<li key={index}>
									<button
										onClick={() => handlePageChange(num)}
										className={clsx(
											pagination.page === num && styles['active']
										)}
									>
										{num + 1}
									</button>
								</li>
							);
						})}
					</ul>
					<button
						onClick={() => handlePageChange(pagination.page + 1)}
						disabled={pagination.page === pagination.totalPage - 1}
					>
						<NextIcon />
					</button>
					<button
						onClick={() => handlePageChange(pagination.totalPage - 1)}
						disabled={pagination.page === pagination.totalPage - 1}
					>
						<LastIcon />
					</button>
				</div>
			</>
		);
	}
};
