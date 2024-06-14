import { getCities } from "../api";

export const fetchCities = async () => {
	const cities = await getCities();

	return {
		error: null,
		res: cities,
	};
};
