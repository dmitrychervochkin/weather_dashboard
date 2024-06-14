import { addCity, getCity } from '../api';

export const saveCity = async (hash, countryName, weatherData, updatedCountry, userId) => {
	console.log(updatedCountry)
	console.log(weatherData)
	console.log(countryName)
	const savedWeather = updatedCountry.id ? await getCity(countryName) : await addCity(weatherData, userId);

	return {
		error: null,
		res: savedWeather,
	};
};
