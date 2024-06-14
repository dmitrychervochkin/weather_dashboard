import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRequestServer } from '../../../../hooks/use-request-server';
import { convertTime, getCurrentDate } from '../../../../components/left-side-bar/components/utils';
import { CityField } from './components';
import { Loader } from '../../../../components';
import { useSelector } from 'react-redux';
import { selectCountry, selectCountryName } from '../../../../reducers';

const CitiesListContainer = ({ className }) => {
	const requestServer = useRequestServer();
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const city = useSelector(selectCountry);
	console.log(city)

	useEffect(() => {
		requestServer('fetchCities').then(({ res }) => {
			setCities(res);
		});
	}, [city]);

	return (
		<div className={className}>
			{cities.map((city) => (
				<CityField key={city.id} city={city} />
			))}
		</div>
	);
};

export const CitiesList = styled(CitiesListContainer)`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`;
