import {MONTHS} from '../../../../constants';

export const getCurrentDate = () => {
	const date = new Date();
	const monthNumber = date.getMonth()+1

	const currentDate = `${date.getDate()} ${MONTHS[monthNumber-1]}`;

	return String(currentDate);
};
