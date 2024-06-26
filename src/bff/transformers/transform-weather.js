export const transformWeather = (dbWeather) => ({
	name: dbWeather.name,
	feelsLike: dbWeather.main.feels_like,
	grndLevel: dbWeather.main.grnd_level,
	humidity: dbWeather.main.humidity,
	temp: dbWeather.main.temp,
	tempMax: dbWeather.main.temp_max,
	tempMin: dbWeather.main.temp_min,
	country: dbWeather.sys.country,
	sunrise: dbWeather.sys.sunrise,
	sunset: dbWeather.sys.sunset,
	wind: dbWeather.wind,
	timezone: dbWeather.timezone,
	weather: dbWeather.weather[0],
});
