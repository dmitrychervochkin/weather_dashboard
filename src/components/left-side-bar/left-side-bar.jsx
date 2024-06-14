import styled from 'styled-components';
import { Icon } from '../icon/icon';
import { Input } from '../input/input';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRequestServer } from '../../hooks/use-request-server';
import { clearCountry, selectCountry, selectUserId, setCountry } from '../../reducers';
import { Weather } from './components/weather';

const LeftSideBarContainer = ({ className }) => {
	const [currentCountry, setCurrentCountry] = useState('');
	const [isBarNotActive, setIsBarNotActive] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const dispatch = useDispatch();
	const requestServer = useRequestServer();
	const country = useSelector(selectCountry);
	const userId = useSelector(selectUserId);

	const onBarClick = ({ target }) => {
		setErrorMessage('');
		const barActive = document.querySelector('.bar');
		barActive.classList[1] === 'active' ? setIsBarNotActive(true) : setIsBarNotActive(false);
		target.parentElement.parentElement.parentElement.classList.toggle('active');
		dispatch(clearCountry());
		setCurrentCountry('')
	};

	const onCountryChange = ({ target }) => {
		setCurrentCountry(target.value);
	};

	const onSubmit = () => {
		if (currentCountry === '') {
			return;
		}

		requestServer('fetchWeather', currentCountry).then(({ error, res }) => {
			if (error) {
				setErrorMessage(error);
			}
			dispatch(setCountry(res));
		});


		dispatch(clearCountry());
	};

	return (
		<div className={className}>
			<div className="bar">
				<div className="bar-header">
					{isBarNotActive ? (
						<Icon id="fa-plus-square btn-icon" size="30px" onClick={onBarClick} />
					) : (
						<Icon id="fa-window-close btn-icon" size="30px" onClick={onBarClick} />
					)}
					<Input
						className="city-input"
						width="185px"
						placeholder="Enter the city..."
						value={currentCountry}
						onChange={onCountryChange}
					/>
					<Icon
						type="submit"
						id="fa-arrow-right btn-icon"
						size="25px"
						margin="0 0 0 35px"
						color="black"
						onClick={onSubmit}
					/>
				</div>
				{country.name ? (
					!isBarNotActive && <Weather setCurrentCountry={setCurrentCountry} userId={!!userId} country={country} color="white" />
				) : (
					<div className="no-country-message">
						{errorMessage ? errorMessage : 'Press the city...'}
					</div>
				)}
			</div>
		</div>
	);
};

export const LeftSideBar = styled(LeftSideBarContainer)`
	& .bar {
		margin-right: 500px;
		padding: 45px;
		height: 710px;
		width: 310px;
		background-color: #5c9ce5;
		border-radius: 30px;
		display: flex;
		transition: 0.8s;
		flex-direction: column;
	}

	& .bar-header {
		display: flex;
		align-items: center;
	}
	& .city-input {
		margin-left: 20px;
	}
	& .btn-icon {
		margin-left: -28px;
		// margin-right: 20px;
		color: white;
		transition: 0.8s;
		// & > i{
		// 	margin-right: 20px;
		// }
		&:hover {
			filter: brightness(90%);
		}
	}

	& .active {
		padding-right: 600px;
		transition: 0.8s;
	}
	& .active > .bar-header > div > .fa {
		margin-left: -20px;
		transition: 0.8s;
	}

	& .active > .bar-header > div {
		transition: 0.8s;
	}

	& .no-country-message {
		text-align: center;
		margin-left: -50px;
		margin-top: 30px;
		font-size: 20px;
		color: white;
	}
`;
