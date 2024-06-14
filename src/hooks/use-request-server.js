import { useCallback } from 'react';
import { selectUserSession } from '../reducers';
import { useSelector } from 'react-redux';
import { server } from '../bff';

export const useRequestServer = () => {
	const session = useSelector(selectUserSession);

	return useCallback(
		(operation, ...params) => {
			const request = ['register', 'authorize', 'fetchWeather', 'fetchCities'].includes(operation)
				? params
				: [session, ...params];
			return server[operation](...request);
		},
		[session],
	);
};
