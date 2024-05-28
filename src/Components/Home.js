import React, { useEffect, useState } from "react";
import { CDN_URL } from "../Utils/constraints";
import RestaurantsCard from "./RestaurantsCard";
import ShimmerRestaurantsCard from "./ShimmerRestaurantsCard";
import { useSelector } from "react-redux";
import SliderRestro from "./SliderRestro";
import { nanoid } from "@reduxjs/toolkit";
import { apiDataResponse } from "../Utils/apiData";
import "./Home.css";

const Home = () => {
	const [restaurantsName, setRestaurantsName] = useState([]);
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(true);
	const likeRestro = useSelector((state) => state.FavourateRestro.likeRestro);
	const [filter, setFilter] = useState(false);
	const [filteredRestro, setFilteredRestro] = useState([]);
	const [checkFilter, setCheckFilter] = useState(false);
	const [SliderRestroDataContaine, setSliderRestroDataContaine] =
		useState("");

	const [buttonState, setButtonState] = useState({
		isOpen: false,
		rating: false,
		deliveryTime: false,
		veg: false,
	});

	const searchHandler = (e) => {
		e.preventDefault();
		const temp = restaurantsName.filter((data) =>
			data.info.name.toLowerCase().includes(input.toLowerCase())
		);
		setInput("");
		setRestaurantsName(temp);
	};

	const fetchData = async () => {
		try {
			setLoading(true);
			setSliderRestroDataContaine(apiDataResponse);

			setRestaurantsName(
				apiDataResponse?.data?.cards[1]?.card?.card?.gridElements
					?.infoWithStyle?.restaurants
			);
			setFilteredRestro(
				apiDataResponse?.data?.cards[1]?.card?.card?.gridElements
					?.infoWithStyle?.restaurants
			);
		} catch (error) {
			console.log("Error", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleButtonClick = (type) => {
		setButtonState((prevState) => ({
			...prevState,
			[type]: !prevState[type],
		}));
		FilterHandler(type);
	};

	const favRestroHandler = () => {
		console.log(likeRestro);
		setFilter((prev) => !prev);
	};

	const clearFilterHandler = () => {
		setFilter(false);
		setCheckFilter(false);
		const temp = restaurantsName;
		setFilteredRestro(temp);
		setButtonState({
			isOpen: false,
			rating: false,
			deliveryTime: false,
			veg: false,
		});
		fetchData();
	};

	const FilterHandler = (str) => {
		let temp = [...filteredRestro];

		if (buttonState[str] === true) {
			clearFilterHandler();
		} else {
			if (str === "isOpen") {
				temp = filteredRestro.filter((obj) => obj.info.isOpen === true);
			}
			if (str === "rating") {
				temp = filteredRestro.filter(
					(obj) => obj.info.avgRating >= 4.3
				);
			}
			if (str === "deliveryTime") {
				temp = filteredRestro.filter(
					(obj) => obj.info.sla.deliveryTime <= 30
				);
			}
			if (str === "veg") {
				temp = filteredRestro.filter((obj) => obj.info.veg === true);
			}
		}
		setFilter(false);
		setFilteredRestro(temp);
		setCheckFilter(true);
	};

	return (
		<div>
			<div className="flex justify-end items-center border rounded-xl bg-slate-50 ml-1 mr-1">
				<span>Search</span>
				<form onSubmit={searchHandler}>
					<div class="wrap-input-18">
						<div class="search">
							<div>
								<input
									type="text"
									placeholder="Your Favourate restaurants..."
									value={input}
									onChange={(e) => setInput(e.target.value)}
								/>
							</div>
						</div>
					</div>
				</form>
			</div>

			{!loading && (
				<SliderRestro
					key={nanoid()}
					shareData={SliderRestroDataContaine}
				/>
			)}

			<div className="flex items-center mt-20 ml-20 gap-2 font-medium">
				<button
					key={1}
					onClick={clearFilterHandler}
					className="relative text-white bg-gray-500 px-4 py-2 rounded-2xl hover:bg-gray-500 hover:text-white transition duration-300 ease-in-out flex"
				>
					Restore All...
					<span className="absolute top-0 right-1">
						{
							Object.values(buttonState).filter((value) => value)
								.length
						}
					</span>
				</button>

				<button
					key={2}
					onClick={() => handleButtonClick("rating")}
					className={`text-black px-4 py-2 rounded-full transition duration-300 ease-in-out ${
						buttonState.rating
							? "bg-gray-100 hover:bg-gray-200 hover:text-black border border-slate-600"
							: "bg-gray-100 hover:bg-gray-200 hover:text-black"
					}`}
				>
					Ratings 4.0+
					{buttonState.rating && <span className="text-sm"> ❌</span>}
				</button>

				<button
					key={3}
					onClick={() => handleButtonClick("isOpen")}
					className={`text-black px-4 py-2 rounded-full transition duration-300 ease-in-out ${
						buttonState.isOpen
							? "bg-gray-100 hover:bg-gray-200 hover:text-black border border-slate-600"
							: "bg-gray-100 hover:bg-gray-200 hover:text-black"
					}`}
				>
					Is Open
					{buttonState.isOpen && <span className="text-sm"> ❌</span>}
				</button>

				<button
					key={4}
					onClick={() => handleButtonClick("deliveryTime")}
					className={`text-black px-4 py-2 rounded-full transition duration-300 ease-in-out ${
						buttonState.deliveryTime
							? "bg-gray-100 hover:bg-gray-200 hover:text-black border border-slate-600"
							: "bg-gray-100 hover:bg-gray-200 hover:text-black"
					}`}
				>
					Within 30 Min
					{buttonState.deliveryTime && (
						<span className="text-sm"> ❌</span>
					)}
				</button>

				<button
					key={5}
					onClick={() => handleButtonClick("veg")}
					className={`text-black px-4 py-2 rounded-full transition duration-300 ease-in-out ${
						buttonState.veg
							? "bg-gray-100 hover:bg-gray-200 hover:text-black border border-slate-600"
							: "bg-gray-100 hover:bg-gray-200 hover:text-black"
					}`}
				>
					Pure Veg
					{buttonState.veg && <span className=" text-sm"> ❌</span>}
				</button>

				<button
					key={6}
					onClick={favRestroHandler}
					className="text-black bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-400 hover:text-white transition duration-300 ease-in-out"
				>
					Favourite Restro
				</button>
			</div>

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
					!checkFilter &&
					restaurantsName.map((restaurants, index) => (
						<div key={index}>
							<RestaurantsCard
								key={index}
								restaurants={restaurants.info}
							/>
						</div>
					))}
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-20 mb-20 gap-5">
				{!loading &&
					!filter &&
					checkFilter &&
					filteredRestro.map((restaurants, index) => (
						<div key={index}>
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
