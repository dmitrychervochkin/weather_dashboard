import { getCity, getWeather } from '../api';
import { saveCity } from './save-city';

export const fetchWeather = async (country, coords) => {
	const APIkey = import.meta.env.VITE_API_KEY;
	let city;
	let weatherData;
	let error;

	const theCountryWithACapitalLetter = country && country[0].toUpperCase() + country.substr(1);

	[city, weatherData] = await Promise.all([
		getCity(theCountryWithACapitalLetter),
		getWeather(country, coords, APIkey).catch((weatherError) => {
			error = weatherError;
		}),
	]);

	if (city) {
		return {
			error: null,
			res: city,
		};
	}

	if (error) {
		return {
			error,
			res: null,
		};
	}

	return {
		error: null,
		res: weatherData,
	};
};
