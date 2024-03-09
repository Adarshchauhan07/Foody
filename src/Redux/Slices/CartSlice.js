import { createSlice } from "@reduxjs/toolkit";


const CartSlice = createSlice({
	name: "cart",
	initialState: {
		cartItems: [],
	},
	reducers: {
		addItems: (state, action) => {
			state.cartItems.push(action.payload);
		},
		removeItems: (state, action) => {
			state.cartItems = state.cartItems.filter(
				(ide) => ide.card.info.id !== action.payload.card.info.id
			);
		},
	},
});


export const { addItems,removeItems } = CartSlice.actions;
export default CartSlice.reducer;

