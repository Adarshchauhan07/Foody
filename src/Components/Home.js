import React, { useEffect, useState } from "react";
import { CDN_URL } from "../Utils/constraints";
import RestaurantsCard from "./RestaurantsCard";
import { NavLink } from "react-router-dom";
import ShimmerRestaurantsCard from "./ShimmerRestaurantsCard";
import { useSelector } from "react-redux";
import SliderRestro from "./SliderRestro";
import { nanoid } from "@reduxjs/toolkit";
import {apiDataResponse} from "../Utils/apiData";

const Home = () => {


	const [restaurantsName, setRestaurantsName] = useState([]);
	const [input, setInput] = useState("");
	const [loading, setloading] = useState(true);
	const likeRestro = useSelector((state) => state.FavourateRestro.likeRestro);
	const [filter, setFilter] = useState(false);
	const [SliderRestroDataContaine, setSliderRestroDataContaine] =
		useState("");

	const searchHandler = (e) => {
		e.preventDefault();
		const temp = restaurantsName.filter((data) =>
			data.info.name.toLowerCase().includes(input.toLowerCase())
		);
		setInput("");
		setRestaurantsName(temp);
	};

	const fetchData = async () => {

		// console.log("🙃" + apiDataResponse);
		// console.log(JSON.stringify(apiDataResponse)); // Stringify the entire object


		try {
			setloading(true);

		
			setSliderRestroDataContaine(apiDataResponse);

			setRestaurantsName(
				apiDataResponse?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
					?.restaurants
			);
		} catch (error) {
			console.log("Error", error);
		} finally {
			setloading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		console.log("👉", restaurantsName);
	}, [restaurantsName]);

	function favRestroHandler() {
		console.log(likeRestro);
		setFilter(true);
	}

	function clearFilterHandler() {
		setFilter(false);
		fetchData();
	}

	return (
		<div>
			<div className="flex justify-center items-center border rounded-md p-4 mb-4">
				<form>
					<input
						type="text"
						placeholder="Search the restaurant you want..."
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className="border p-2 mr-2 outline-none w-64"
					/>
				</form>
				<button
					key={nanoid}
					onClick={searchHandler}
					className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
				>
					SEARCH
				</button>
			</div>

			{/* slider Restro start */}
			{!loading && (
				<SliderRestro
					key={nanoid}
					shareData={SliderRestroDataContaine}
				/>
			)}

			{/* slider Restro end */}

			{/* filetr division St*/}
			<div className="flex items-center mt-20 ml-20 gap-2 font-medium	">
				<button
					key={1}
					onClick={clearFilterHandler}
					className="text-white bg-gray-700 px-4 py-2 rounded-2xl hover:bg-gray-500 hover:text-white transition duration-300 ease-in-out"
				>
					Clear All Filters
				</button>
				<button
					key={2}
					onClick={favRestroHandler}
					className="text-black bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-400 hover:text-white transition duration-300 ease-in-out"
				>
					Favourite Restro
				</button>
			</div>

			{/* filetr division end*/}

			{loading && <ShimmerRestaurantsCard />}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-20 ml-20 gap-5">
				{!loading &&
					filter &&
					likeRestro.map((restaurants, index) => (
						<RestaurantsCard
							key={index}
							restaurants={restaurants}
						/>
					))}
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-20 mb-20 gap-5">
				{!loading &&
					!filter &&
					restaurantsName.map((restaurants, index) => (
						<div className="">
							<RestaurantsCard
								key={index}
								restaurants={restaurants.info}
							/>
						</div>
					))}
			</div>
		</div>
	);
};

export default Home;
