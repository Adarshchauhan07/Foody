import { createSlice } from "@reduxjs/toolkit";

const FavourateRestroSlice = createSlice({
	name: "FavourateRestro",
	initialState: {
		likeRestro: [],
	},
	reducers: {
		addItem: (state, action) => {
			state.likeRestro.push(action.payload);
		},
		removeItem: (state, action) => {
			state.likeRestro = state.likeRestro.filter(
				(res) => res.id !== action.payload.id
			);
		},
	},
});

export const {addItem, removeItem}=FavourateRestroSlice.actions;
export default FavourateRestroSlice.reducer;