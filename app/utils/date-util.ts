import { format } from 'date-fns';

export const formatToDate = (date?: Date) => {
	if (date) {
		return format(date, 'yyyy-MM-dd');
	} else {
		return '-';
	}
};
