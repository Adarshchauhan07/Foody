import React from "react";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import About from './Components/About'
import Cart from './Components/Cart'
import RestaurantsMenu from './Components/RestaurantsMenu'


const App=()=>{
  return(
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/About'/>
        <Route path='/Cart' element={<Cart/>}/>
        <Route path='/Restaurants/:ID' element={<RestaurantsMenu/>}/>
        <Route path='/*' element={<div>404 NOT FOUND</div>}/>
      </Routes>
    </div>
  );
}
export default App