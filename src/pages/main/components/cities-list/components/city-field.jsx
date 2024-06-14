import styled from 'styled-components';
import {
	convertTime,
	getCurrentDate,
	getMathRound,
} from '../../../../../components/left-side-bar/components/utils';
import { Icon, IconImg } from '../../../../../components';
import { useEffect, useState } from 'react';
import { useRequestServer } from '../../../../../hooks/use-request-server';

const CityFieldContainer = ({ className, city }) => {
	const date = getCurrentDate();
	const {
		name,
		country,
		humidity,
		grndLevel,
		sunset,
		sunrise,
		feelsLike,
		timezone,
		temp,
		tempMax,
		tempMin,
		weather: { icon, description },
		wind: { deg, gust, speed },
	} = city;

	const currentSunset = convertTime(sunset, timezone);
	const currentSunrise = convertTime(sunrise, timezone);

	const onFieldCLick = ()=>{
		console.log(name)
	}

	return (
		<>
			<div className={className} onClick={onFieldCLick}>
				<div className="weather-header">
					<div className="header-left-side">
						<div className="name">
							<Icon id="fa-location-arrow" size="12px" margin="0 10px 0 0" inactive />
							{name}, {country}
						</div>
						<div className="current-date">Today {date}</div>
					</div>
					<div className="header-right-side">
						<div className="sunrise">
							<Icon id="fa-upload" size="12px" margin="0 3px 0 0" inactive />
							{currentSunrise}
						</div>
						<div className="sunset">
							<Icon id="fa-download" size="12px" margin="0 3px 0 0" inactive />
							{currentSunset}
						</div>
					</div>
				</div>
				<div className="weather-info">
					<div className="temperature-data">
						<div className="temperature">{getMathRound(temp) + '°'}</div>
						<IconImg iconId={icon} className="description-icon" />
					</div>
					<div className="weather-description">
						<div className="weather-footer">
							<p className="only-description">{description}</p>
							<div className="feels-like">{`Feels like: ${getMathRound(feelsLike)}°`}</div>
						</div>
						<Icon id="fa-trash-o" />
					</div>
				</div>
			</div>
		</>
	);
};

export const CityField = styled(CityFieldContainer)`
	font-size: 12px;
	border-radius: 20px;
	margin-top: 20px;
	padding: 10px 20px;
	width: 170px;
	box-shadow: 0px 0px 20px -5px #b1c5e5;
	background-color: #ffffff;
	transition: 0.2s;

	&:hover {
		transition: 0.2s;
		box-shadow: 0px 0px 20px -5px #c4e3e5;
		cursor: pointer;
		filter: brightness(96%);
	}

	& .fa-trash-o {
		transition: 0.2s;
		color: #999999;
		&:hover {
			transition: 0.2s;
			color: black;
		}
	}

	& .weather-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;

		// &:hover {
		// 	transition: 0.2s;
		// 	box-shadow: 0px 0px 20px -5px #c4e3e5;
		// 	cursor: pointer;
		// 	background-color: #F0F0F0;
		// 	// filter: brightness(96%);
		// }
	}
	& .name {
		display: flex;
		font-weight: 600;
	}
	& .sunrise {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	& .sunset {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	& .weather-info {
		// display: flex;
	}
	& .temperature {
		font-size: 40px;
		font-weight: 600;
	}
	& .temperature-data {
		display: flex;
		justify-content: space-between;
	}
	& .only-description {
		&:first-letter {
			text-transform: capitalize;
		}
	}
	& .weather-description {
		display: flex;
		justify-content: space-between;
	}
`;
