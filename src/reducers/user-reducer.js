import { createSlice } from '@reduxjs/toolkit';
import { server } from '../bff';

const initialState = {
	session: '',
	id: '',
	login: '',
	password: '',
	imgUrl: '',
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			return { ...state, ...action.payload };
		},
		userLogout: (state, action) => {
			server.logout(action.payload)
			return initialState ;
		},
	},
	selectors: {
		selectUserLogin: (state) => state.login,
		selectUserId: (state) => state.id,
		selectUserSession: (state) => state.session,
		selectUserImg: (state) => state.imgUrl,
	},
});

export const { setUser, userLogout } = userSlice.actions;
export const { selectUserLogin, selectUserId, selectUserSession, selectUserImg } = userSlice.selectors;
export const userReducer = userSlice.reducer;
