import { transformCity } from '../transformers';

export const getCities = () =>
	fetch(`http://localhost:3005/cities`)
		.then((loadedCities) => loadedCities.json())
		.then((loadedCities) => loadedCities && loadedCities.map(transformCity));
