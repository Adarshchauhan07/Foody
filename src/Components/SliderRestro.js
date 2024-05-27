import React, { useEffect, useState } from "react";
import { CDN_URL } from "../Utils/constraints";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { IoLocation, IoCaretBackOutline } from "react-icons/io5";
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
					tempRestroNames.card.card.gridElements.infoWithStyle
						.restaurants || []
				);
			}
		};
		fetchData();
	}, [shareData]);

	useEffect(() => {
		if (restroNames.length > 0) {
			setRestaurants(restroNames[count].info);
		}
	}, [count, restroNames]);

	const topRestroHandlerButton = (num) => {
		setCount((num + restroNames.length) % restroNames.length);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setCount((prevCount) => (prevCount + 1) % restroNames.length);
		}, 3000);

		return () => clearInterval(interval);
	}, [restroNames.length]);

	return (
		<div>
			{restaurants && (
				<div className="flex justify-center gap-5">
					<button onClick={() => topRestroHandlerButton(count - 1)}>
						<IoCaretBackOutline fontSize="3rem" />
					</button>

					<div className="h-60 bg-transparent rounded-lg shadow-xl flex justify-evenly items-center px-5 py-0">
						<div className="flex flex-col gap-1 px-6">
							<h2 className="text-emerald-900 font-black text-4xl mb-4">
								{
									shareData.data.cards[1].card.card.header
										?.title
								}
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
												(res, index) => (
													<span key={index}>
														{res},{" "}
													</span>
												)
											)}
										</div>

										<div className="flex items-center mb-2 justify-between text-sm">
											<span className="ml-1 flex text-emerald-500">
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
															return (
																<FaStarHalfAlt
																	key={index}
																/>
															);
														} else {
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

						<div className="w-64 h-56 flex items-center rounded-3xl justify-center relative transition duration-300 ease transform hover:scale-105 shadow-lg">
							<img
								src={CDN_URL + restaurants.cloudinaryImageId}
								alt={restaurants.name}
								className="w-full h-full card relative rounded-3xl p-1"
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
