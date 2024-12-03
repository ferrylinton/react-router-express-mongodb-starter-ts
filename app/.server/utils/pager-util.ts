export const PAGE_SIZE = 10;

export const getSort = (sort: string) => {
	const result: any = {};
	const arr = sort.split(',');
	result[arr[0]] = arr.length === 1 || arr[1] === 'asc' ? 1 : -1;
	return result;
};
