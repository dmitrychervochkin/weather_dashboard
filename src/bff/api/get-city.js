import { transformCity } from '../transformers';

export const getCity = async (name) =>
	fetch(`http://localhost:3005/cities?name=${name}`)
		.then((loadedCity) => loadedCity.json())
		.then(([loadedCity]) => loadedCity && transformCity(loadedCity));
