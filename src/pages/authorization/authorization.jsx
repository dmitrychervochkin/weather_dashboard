import styled from 'styled-components';
import * as yup from 'yup';
import { Button, Input } from '../../components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { server } from '../../bff';
import { useState } from 'react';
import { selectUserLogin, setUser } from '../../reducers';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин...')
		.matches(/^\w+$/, 'Неверный логин! Допускаются только буквы и цифры. ')
		.min(3, 'Неверный логин. Минимум 3 символа.')
		.max(15, 'Неверный логин. Максимум 15 символов.'),
	password: yup
		.string()
		.required('Заполните пароль.')
		.matches(/^[\w#%]+$/, 'Неверно заполнен пароль! Допускаются буквы и цифры и знаки "#", "%".')
		.min(6, 'Неверно заполнен пароль. Минимум 6 символа.')
		.max(30, 'Неверно заполнен пароль. Максимум 30 символов.'),
});

const AutorizationContainer = ({ className }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	const userLogin = useSelector(selectUserLogin);

	const onSubmit = ({ login, password }) => {
		server.authorize(login, password).then(({ res, error }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}
			dispatch(setUser(res));
			sessionStorage.setItem('userData', JSON.stringify(res));
		});
	};

	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	if(userLogin){
		return <Navigate to='/' />
	}

	return (
		<div className={className}>
			<h2>Авторизация</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="inputs">
				<div>
					<p className="text-input">Логин</p>
					<Input
						width="250px"
						height="20px"
						type="login"
						placeholder="Введите логин..."
						{...register('login', { onChange: () => setServerError(null) })}
					></Input>
				</div>
				<div>
					<p className="text-input">Пароль</p>
					<Input
						width="250px"
						height="20px"
						type="password"
						placeholder="Введите пароль..."
						{...register('password', { onChange: () => setServerError(null) })}
					></Input>
				</div>
				{errorMessage && <div className="errorForm">{errorMessage}</div>}
				<Button type="submit" width="150px" height="40px" disabled={!!formError}>
					Войти
				</Button>
			</form>
		</div>
	);
};

export const Authorization = styled(AutorizationContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	padding-top: 160px;

	& .errorForm {
		line-height: 15px;
		font-size: 12px;
		padding: 0 18px;
	}

	& button {
		margin-top: 30px;
	}

	& .text-input {
		margin-left: 15px;
		font-weight: 600;
	}

	& .inputs {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 280px;
		margin-top: 50px;
	}

	& input {
		margin-bottom: 15px;
	}
`;
