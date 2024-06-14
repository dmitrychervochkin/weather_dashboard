import { Route, Routes, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import { Authorization, Main } from './pages';
import { useDispatch, useSelector } from 'react-redux';
import { useLayoutEffect } from 'react';
import { selectUserLogin, setUser } from './reducers';
import { LeftSideBar } from './components';

const Page = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;
const WeatherField = styled.div`
	position: fixed;
	padding: 40px;
	height: 720px;
	width: 700px;
	background-color: #e4f1ff;
	border-radius: 30px;
	box-shadow: 0px 0px 20px -5px #63a9f7;
`;
const WeatherField1 = styled.div``;

function App() {
	const dispatch = useDispatch();
	const user = useSelector(selectUserLogin);
	const match = useMatch('/');
	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) {
			return;
		}

		const currentUserData = JSON.parse(currentUserDataJSON);

		dispatch(
			setUser({
				...currentUserData,
			}),
		);
	}, [dispatch]);

	return (
		<Page>
			{match && user ? <LeftSideBar /> : <div></div>}
			<WeatherField>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<div>Register</div>} />
					<Route path="/weather" element={<div>Register</div>} />
				</Routes>
			</WeatherField>
		</Page>
	);
}

export default App;

// json-server --watch src/db.json --port 3005
