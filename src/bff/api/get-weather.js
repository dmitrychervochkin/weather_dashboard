import { transformWeather } from '../transformers';

export const getWeather = async (country, coord, APIkey) =>
	fetch(
		`http://api.openweathermap.org/data/2.5/weather?${
			country ? `q=${country}` : `lat=${coord.lat}&lon=${coord.lon}`
		}&units=metric&lang=en&appid=${APIkey}`,
	)
		.then((res) => {
			if (res.ok) {
				return res;
			}
			const error = res.status === 404 ? 'City is not found!' : 'Ooops... Please try again later!';
			return Promise.reject(error);
		})
		.then((loadedWeather) => loadedWeather.json())
		.then((loadedWeather) => loadedWeather && transformWeather(loadedWeather))
		// .then((loadedWeather) => console.log(loadedWeather));
