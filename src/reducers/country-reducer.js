import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	id: '',
	name: '',
	feelsLike: '',
	grndLevel: '',
	humidity: '',
	temp: '',
	tempMax: '',
	tempMin: '',
	country: '',
	sunrise: '',
	sunset: '',
	timezone: '',
	wind: {},
	weather: {},
	isFavorite: false,
};

export const countrySlice = createSlice({
	name: 'country',
	initialState,
	reducers: {
		setCountry: (state, action) => {
			return { ...state, ...action.payload };
		},
		clearCountry: (state, action) => {
			return initialState;
		},
	},
	selectors: {
		selectCountry: (state) => state,
	},
});

export const { setCountry, clearCountry } = countrySlice.actions;
export const { selectCountryName, selectCountry } = countrySlice.selectors;
export const countryReducer = countrySlice.reducer;
