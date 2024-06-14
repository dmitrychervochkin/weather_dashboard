import { configureStore } from '@reduxjs/toolkit';
import { userReducer, countryReducer } from './reducers';

export const store = configureStore({
	reducer: {
		user: userReducer,
		country: countryReducer,
	},
});
