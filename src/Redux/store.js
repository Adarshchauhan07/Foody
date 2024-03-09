import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slices/CartSlice";
import FavourateRestroReducer from "./Slices/FavourateRestroSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    FavourateRestro: FavourateRestroReducer,
  },
});

export default store;
