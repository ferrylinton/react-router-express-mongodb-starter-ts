type FindResult<T> = {
	list: Array<T>;
	total: number;
};

type ValidationError = {
	[key: string]: string;
};

type Pagination = {
	total: number;
	totalPage: number;
	page: number;
	pageSize: number;
};

type Pageable<T> = {
	data: Array<T>;
	pagination: Pagination;
	keyword?: string;
	column?: string;
	sort?: string;
};

type RequestParams = {
	column?: string;
	keyword?: string;
	page?: number;
	sort?: string;
};

type PaginationProps = {
	pagination: Pagination;
	goToPage: (page: number) => void;
};

type KeyValue = {
	[key: string]: string;
};
