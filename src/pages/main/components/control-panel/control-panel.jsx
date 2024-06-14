import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectUserImg, selectUserLogin, selectUserSession, userLogout } from '../../../../reducers';
import { Icon } from '../../../../components/icon/icon';
import { Link } from 'react-router-dom';
import { Button } from '../../../../components';

const ControlPanelContainer = ({ className }) => {
	const login = useSelector(selectUserLogin);
	const userImg = useSelector(selectUserImg);
	const session = useSelector(selectUserSession);
	const dispatch = useDispatch();

	// const handleDropdownClick = ({ target }) => {
	// 	target.parentElement.parentElement.querySelector('.dropdown-content').classList.toggle('disabled');

	// 	setTimeout(() => {
	// 		target.parentElement.parentElement.querySelector('.dropdown-content').classList.add('disabled');
	// 	}, 2000);
	// };

	const onLogout = () => {
		sessionStorage.removeItem('userData');
		dispatch(userLogout(session));
	};

	const onCountryCreate = () => {};

	return (
		<div className={className}>
			<div className="user-info">
				{!login && <p className="wlcm-info">Welcome! Sign in or sign up now!</p>}
				{login && <p className="wlcm-info">Welcome back {login}!</p>}
				<p>Check out today`s weather information</p>
			</div>
			<div className="user-account">
				<div className="dropdown">
					<a href="#" className="settings-icon">
						<Icon
							className="settings-icon"
							id="fa-bars"
							size="25px"
							// onClick={handleDropdownClick}
						/>
					</a>
					<div className="dropdown-content disabled" >
					{/* onClick={handleDropdownClick} */}
						<Link to="login">
							Sign in
							<Icon id="fa-user" size="20px" margin="0 7px 0 0" />
						</Link>
						<Link to="register">
							Sign up
							<Icon id="fa-user-plus" size="20px" />
						</Link>
						<Link to="#" onClick={onCountryCreate}>
							Add new country
							<Icon id="fa-plus-square-o" size="20px" margin="0 5px 0 0" />
						</Link>
						<Link to="/" onClick={onLogout}>
							Logout
							<Icon id="fa-sign-out" size="20px" margin="0 1px 0 0" />
						</Link>
					</div>
				</div>
				{login && <img className="user-img" src={userImg}></img>}
			</div>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	height: 50px;
	width: 100%;
	justify-content: space-between;

	& .wlcm-info {
		font-weight: 500;
	}

	& .settings-icon {
		&:active {
			font-size: 26px;
		}

		&:focus ~ .dropdown-content {
			display: block;
		}
	}
	& .user-account {
		display: flex;
		align-items: center;
	}
	& .user-info {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	& .user-img {
		margin-left: 20px;
		width: 50px;
		height: 50px;
		border-radius: 15px;
		object-fit: cover;
		object-position: center;

		&:hover {
			cursor: pointer;
		}
		&:active {
			width: 51px;
			height: 51px;
			margin-left: 19px;
			cursor: pointer;
		}
	}

	& .dropdown {
		position: relative;
		display: inline-block;
	}

	& .dropdown-content {
		display: none;
		position: absolute;
		background-color: white;
		border-radius: 15px;
		min-width: 200px;
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
		z-index: 1;

		&:hover {
			display: block;
		}
	}

	& .dropdown-content a {
		-webkit-user-select: none;
		color: black;
		padding: 8px 15px;
		text-decoration: none;
		display: flex;
		font-weight: 500;
		justify-content: space-between;
		align-items: center;
	}

	& .dropdown-content a:hover {
		background-color: #ddd;

		&:first-child {
			border-top-left-radius: 15px;
			border-top-right-radius: 15px;
		}
		&:last-child {
			border-bottom-left-radius: 15px;
			border-bottom-right-radius: 15px;
		}
	}
`;
