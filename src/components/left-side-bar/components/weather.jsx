import styled from 'styled-components';
import { convertTime, getCurrentDate, getMathRound } from './utils';
import { Icon } from '../../icon/icon';
import { IconImg } from '../../icon-img/icon-img';
import { Button } from '../../button/button';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCountry, selectUserId, setCountry } from '../../../reducers';
import { useRequestServer } from '../../../hooks/use-request-server';
import { useState } from 'react';

const WeatherContainer = ({ className, setCurrentCountry, userId: isThereAUser, country }) => {
	const {
		name,
		feelsLike,
		tempMin,
		grndLevel,
		humidity,
		tempMax,
		country: countryName,
		sunset,
		sunrise,
		timezone,
		temp,
		weather: { description, icon },
		wind: { deg, gust, speed },
		isFavorite,
	} = country;



	const date = getCurrentDate();
	const dispatch = useDispatch();
	const requestServer = useRequestServer();
	const updatedCountry = useSelector(selectCountry);
	const userId = useSelector(selectUserId);
	const currentSunset = convertTime(sunset, timezone);
	const currentSunrise = convertTime(sunrise, timezone);

	const onFavoriteButtonClick = () => {
		dispatch(
			requestServer('saveCity', name, country, updatedCountry, userId).then(({ res }) => {
				console.log(res);
				dispatch(setCountry(res));
			}),
		);
		setCurrentCountry('');
		// dispatch(clearCountry());
	};

	return (
		country && (
			<div className={className}>
				<div className="weather-header">
					<div className="header-left-side">
						<div className="name">
							<Icon id="fa-location-arrow" margin="0 10px 0 0" inactive />
							{name}, {countryName}
						</div>
						<div className="current-date">Today {date}</div>
					</div>
					<div className="header-right-side">
						<div className="sunrise">
							<Icon id="fa-upload" size="15px" inactive />
							{currentSunrise}
						</div>
						<div className="sunset">
							<Icon id="fa-download" size="15px" inactive />
							{currentSunset}
						</div>
					</div>
				</div>
				<div className="weather-info">
					<div className="feels-like">{`Feels like: ${getMathRound(feelsLike)}°`}</div>
					<div className="temperature">
						{getMathRound(temp)}
						<Icon id="fa-circle-o" margin="20px 0 0 0 " inactive />
					</div>
					<div className="weather-description">
						<IconImg iconId={icon} className="description-icon" />
						<p className="only-description">{description}</p>
					</div>
				</div>
				<div className="weather-footer">
					<div className="temperature-data white-field">
						<div className="temp-max">
							{`Max t°C: ${getMathRound(tempMax)}°`}
							<Icon id="fa-thermometer-full icon" size="15px" inactive />
						</div>
						<div className="temp-min">
							{`Min t°C: ${getMathRound(tempMin)}°`}
							<Icon id="fa-thermometer-empty icon" size="15px" inactive />
						</div>
					</div>
					<div className="wind-data">
						<div className="wind-deg white-field">{`Wind direction: ${getMathRound(deg)}°`}</div>
						<div className="wind-gust white-field">{`A gust of wind: ${getMathRound(
							gust,
						)} m/s`}</div>
						<div className="wind-speed white-field">{`Wind speed: ${getMathRound(
							speed,
						)} m/s`}</div>
					</div>
					<div className="weather-hum-data">
						<div className="wind-deg white-field">{`Humidity: ${getMathRound(humidity)}%`}</div>
						<div className="wind-gust white-field">
							<Icon id="fa-tint icon" margin="0 10px 0  0" size="15px" inactive />
							{`${getMathRound(grndLevel)} mm Hg`}
						</div>
					</div>
				</div>
				{isThereAUser && (
					<Button
						className="add-to-favourites-button"
						height="50px"
						width="250px"
						onClick={onFavoriteButtonClick}
						isFavorite={isFavorite}
					>
						<Icon id="fa-star-o icon" margin="0 5px 0  0" />
						{isFavorite ? 'Delete from your favorite' : 'Add to favorite'}
					</Button>
				)}
			</div>
		)
	);
};

export const Weather = styled(WeatherContainer)`
	color: ${(color = 'white') => color};
	width: 250px;

	& .fa {
		color: white;
	}
	& .add-to-favourites-button {
		display: flex;
		justify-content: center;
		align-items: center;

		&:hover .fa-star-o {
			margin-top: 1px;
			transition: 1s;
			font-size: 28px;
			transform: rotate(1turn);
		}
	}

	& .feels-like {
		margin-bottom: -20px;
	}
	& .icon {
		color: black;
	}
	& .weather-header {
		color: ${(iconColor = white) => iconColor}
		cursor: default;
		margin: 50px 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	& .name {
		display: flex;
		font-size: 18px;
		font-weight: 400;
		align-items: center;
	}

	& .current-date {
		font-weight: 200;
		// margin-left: 20px;
	}

	& .header-right-side {
		display: flex;
		flex-direction: column;
	}

	& .sunrise {
		display: flex;
		justify-content: space-between;
		width: 60px;
	}

	& .sunset {
		display: flex;
		margin-top: 8px;
		justify-content: space-between;
		width: 60px;
	}

	& .weather-info {
		text-align: center;
		cursor: default;
	}

	& .temperature {
		display: flex;
		justify-content: center;
		font-size: 100px;
	}

	& .weather-description {
		display: flex;
		margin-top: -30px;
		align-items: center;
		// justify-content: center;
	}
	& .weather-footer {
		cursor: default;
	}

	& .only-description {
		text-align: center;
		&:first-letter {
			text-transform: capitalize;
		}
		font-size: 20px;
	}

	& .temperature-data {
		color: black;
		justify-content: space-between;
	}
	& .temp-max {
		display: flex;
	}
	& .temp-min {
		display: flex;
	}
	& .white-field {
		display: flex;
		margin-bottom: 10px;
		padding: 5px 20px;
		border-radius: 20px;
		color: black;
		background-color: white;
		align-items: center;
		transition: 0.3s;

		&:hover {
			filter: brightness(90%);
			cursor: default;
		}
	}
`;
