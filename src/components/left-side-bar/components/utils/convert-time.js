export const convertTime = (time, timezone) => {
	const timeShift = timezone / 60 / 60;

	let minutes = Math.floor((time / 60) % 60);
	let hours = Math.floor((time / (60 * 60)) % 24) + timeShift;

	hours = hours < 10 ? '0' + hours : hours;
	minutes = minutes < 10 ? '0' + minutes : minutes;

	return `${hours}:${minutes}`;
};
