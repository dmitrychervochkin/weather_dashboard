import { styled } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserId, selectUserImg, selectUserLogin } from '../../reducers';
import { useEffect, useState } from 'react';
import { useRequestServer } from '../../hooks/use-request-server';
import { CitiesList, ControlPanel } from './components';
import { Icon, Input, Loader } from '../../components';
import { Weather } from '../../components/left-side-bar/components/weather';
import { CityField } from './components/cities-list/components';

const MainConteiner = ({ className }) => {
	const [coords, setCoords] = useState(null);
	const [error, setError] = useState(null);
	const [city, setCity] = useState(null);
	const requestServer = useRequestServer();
	const userId = useSelector(selectUserId);

	const onPhraseCLick = () => {
		navigator.geolocation.getCurrentPosition(
			function (position) {
				const latitude = position.coords.latitude;
				const longitude = position.coords.longitude;
				setCoords({ lat: latitude, lon: longitude });
			},
			function (error) {
				setError(error.message);
			},
		);
	};

	if (coords) {
		requestServer('fetchWeather', null, coords).then(({ error, res }) => {
			setCity(res);
			setError(error);
		});
		setCoords(null);
	}

	return (
		<div className={className}>
			<ControlPanel />
			{userId ? (
				<CitiesList/>
			) : (
				<div className="geo-error">
					<div>
						{error ? (
							`${error}!`
						) : city ? (
							<div></div>
						) : (
							<div className="click-me" onClick={onPhraseCLick}>
								<Icon id="fa-map-marker" size="18px" margin="0 10px 0 0" />
								Click on me to turn on geolocation...
							</div>
						)}
					</div>
				</div>
			)}
			{city || userId ? (
				<div className="weather-geo">
					{city && <Weather userId={userId} country={city} color="black" iconColor="black" />}
				</div>
			) : (
				city && <Loader className="loader" size="80px" />
			)}
		</div>
	);
};

export const Main = styled(MainConteiner)`
	& .geo-error {
		display: flex;
		flex-direction: column;
		font-weight: 600;
		font-size: 18px;
	}

	& .click-me {
		margin-left: -10px;
		background-color: white;
		border-radius: 15px;
		padding: 2px 0 2px 10px;
		display: flex;
		width: 380px;
		cursor: pointer;
		transition: 0.3s;

		&:hover {
			transition: 0.3s;
			background-color: #f1f1f1;
			box-shadow: 0px 0px 20px -10px black;
		}
	}
	& .weather-geo {
		display: flex;
		justify-content: center;
	}

	& .loader {
		top: 50%;
		left: 50%;
		margin-left: -50px;
		margin-top: -50px;
	}
`;
