import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './Slices/CartSlice'

const store=configureStore({
  reducer:cartReducer
})
export default store