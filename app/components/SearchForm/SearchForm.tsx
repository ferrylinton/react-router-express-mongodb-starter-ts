
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router';
import { ReloadIcon } from '../../icons/ReloadIcon';
import { SearchIcon } from '../../icons/SearchIcon';
import styles from './SearchForm.module.css';
import clsx from 'clsx';

type SearchFormProps = {
	action: string;
};

export const SearchForm = ({ action }: SearchFormProps) => {
	const { t } = useTranslation();

	const navigate = useNavigate();

	const [searchParams] = useSearchParams();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const form = event.currentTarget;
		const formData = new FormData(form);
		const keyword = formData.get('keyword')?.toString().trim() || '';

		if (keyword.length > 0) {
			navigate(`${action}?keyword=${encodeURIComponent(keyword)}`);
		}
	};

	const handleReset = () => {
		navigate(action, { replace: true });
	};

	return (
		<form
			method="get"
			autoComplete="off"
			name="search-form"
			onSubmit={handleSubmit}
			className={styles['search-form']}
		>
			<input
				type="text"
				name="keyword"
				autoComplete="off"
				maxLength={30}
				defaultValue={searchParams.get('keyword') || undefined}
				placeholder={t('keyword')}
			/>
			<button type="submit">
				<SearchIcon />
			</button>
			<button type="reset" onClick={() => handleReset()}>
				<ReloadIcon />
			</button>
		</form>
	);
};
