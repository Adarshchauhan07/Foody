import React, { useEffect, useState } from "react";
import { CDN_URL } from "../Utils/constraints";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { IoCaretBackOutline } from "react-icons/io5";
import { FaCaretRight } from "react-icons/fa";

const SliderRestro = ({ shareData }) => {
	const [restroNames, setRestroNames] = useState([]);
	const [restaurants, setRestaurants] = useState(undefined);
	const [count, setCount] = useState(0);

	useEffect(() => {
		const fetchData = () => {
			const tempRestroNames = shareData.data.cards.find(
				(res) => res.card.card.id === "restaurant_grid_listing"
			);

			if (tempRestroNames) {
				setRestroNames(
					tempRestroNames?.card.card.gridElements.infoWithStyle
						.restaurants || []
				);
			}

			setRestaurants(
				tempRestroNames?.card.card.gridElements.infoWithStyle
					.restaurants[count].info
			);
		};
		fetchData();
	}, []);

	useEffect(() => {
		console.log("👍", shareData);
		// console.log("🟢", restaurants);
	}, [restroNames, restaurants]);

	function topRestroHandlerButton(num) {
		if (num === restroNames.length) {
			setCount(0);
		} else if (num < 0) {
			setCount(restroNames.length - 1);
		} else {
			setCount(num);
		}
		setRestaurants(restroNames[count].info);
		console.log(count);
	}

	return (
		<div>
			{restaurants !== undefined && (
				<div className="flex justify-center gap-5">
					<button onClick={() => topRestroHandlerButton(count - 1)}>
						<IoCaretBackOutline fontSize="3rem" />
					</button>

					<div className="h-60 bg-white rounded-md shadow-xl flex justify-evenly items-center px-5 py-0">
						<div className="flex flex-col gap-1 px-6">
							<h2 className="text-emerald-900 font-black text-4xl mb-4">
								{shareData.data.cards[1].card.card.header
									.title !== undefined &&
									shareData?.data?.cards[1]?.card?.card
										?.header?.title}
							</h2>

							<div className="">
								<div className="p-4 flex justify-evenly">
									<div className="flex flex-row items-center font-black font-serif text-3xl">
										<IoLocation />
										<h6 className="text-gray-500">
											{restaurants.areaName}
										</h6>
									</div>

									<div className="flex flex-col px-8">
										<h3 className="flex text-xl font-semibold justify-between">
											{restaurants.name}
										</h3>
										<div className="text-gray-600 mb-2 italic text-xs">
											{restaurants.cuisines.map(
												(res, index) => {
													return (
														<span key={index}>
															{res},{" "}
														</span>
													);
												}
											)}
										</div>

										<div className="flex items-center mb-2 justify-between text-sm">
											<span className="ml-1 flex text-emerald-500	">
												{Array.from({ length: 5 }).map(
													(_, index) => {
														const starValue =
															index + 1;
														if (
															starValue <=
															parseFloat(
																restaurants.avgRatingString
															)
														) {
															// Full star
															return (
																<FaStar
																	key={index}
																/>
															);
														} else if (
															starValue - 0.5 ===
															parseFloat(
																restaurants.avgRatingString
															)
														) {
															// Half star
															return (
																<FaStarHalfAlt
																	key={index}
																/>
															);
														} else {
															// Empty star
															return (
																<FaStar
																	key={index}
																	style={{
																		color: "lightgray",
																	}}
																/>
															);
														}
													}
												)}
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="flex items-center justify-center relative transition duration-300 ease transform hover:scale-105">
							<img
								src={CDN_URL + restaurants.cloudinaryImageId}
								alt={restaurants.name}
								className="w-full h-56 card relative rounded-3xl p-4"
							/>
						</div>
					</div>

					<button onClick={() => topRestroHandlerButton(count + 1)}>
						<FaCaretRight fontSize="3rem" />
					</button>
				</div>
			)}
		</div>
	);
};

export default SliderRestro;
