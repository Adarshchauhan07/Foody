import React, { useEffect, useState } from "react";
import { CDN_URL } from "../Utils/constraints";
import { FaStar, FaStarHalfAlt, FaCaretRight } from "react-icons/fa";
import { IoLocation, IoCaretBackOutline } from "react-icons/io5";

const SliderRestro = ({ shareData }) => {
	const [restroNames, setRestroNames] = useState([]);
	const [restaurants, setRestaurants] = useState(null);
	const [count, setCount] = useState(0);
	const [loading, setLoading] = useState(true);

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
			setLoading(false);
		}
	}, [count, restroNames]);

	const topRestroHandlerButton = (num) => {
		setCount((num + restroNames.length) % restroNames.length);
		setLoading(true); // Set loading to true when fetching new restaurant data
	};

	return (
		<div className="relative">
			{loading ? (
				<div className="flex justify-center items-center h-64">
					Loading...
				</div>
			) : (
				<div
					className="relative flex justify-between p-10 rounded-xl bg-cover bg-center "
					style={{
						backgroundImage: `url(${
							CDN_URL + restaurants.cloudinaryImageId
						})`,
					}}
				>
					<div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-0 rounded-xl"></div>
					<div className="relative z-10 flex justify-between w-full">
						<div className="flex">
							<button
								onClick={() =>
									topRestroHandlerButton(count - 1)
								}
							>
								<IoCaretBackOutline fontSize="3rem" />
							</button>

							<div className="flex flex-col h-60 isolate rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5 p-4">
								<div className="flex flex-col gap-1 px-6">
									<h2 className="text-emerald-900 font-black text-4xl mb-4">
										{
											shareData.data.cards[1].card.card
												.header?.title
										}
									</h2>

									<div className="p-4 flex justify-evenly">
										<div className="flex flex-row items-center font-black font-serif text-3xl">
											<IoLocation />
											<h6 className="text-gray-500 ml-2">
												{restaurants.areaName}
											</h6>
										</div>

										<div className="flex flex-col px-8">
											<h3 className="text-xl font-semibold">
												{restaurants.name}
											</h3>
											<div className="text-gray-600 mb-2 italic text-xs">
												{restaurants.cuisines.join(
													", "
												)}
											</div>

											<div className="flex items-center mb-2 text-sm text-emerald-500">
												{Array.from({ length: 5 }).map(
													(_, index) => {
														const starValue =
															index + 1;
														return (
															<span key={index}>
																{starValue <=
																parseFloat(
																	restaurants.avgRatingString
																) ? (
																	<FaStar />
																) : starValue -
																		0.5 ===
																  parseFloat(
																		restaurants.avgRatingString
																  ) ? (
																	<FaStarHalfAlt />
																) : (
																	<FaStar
																		style={{
																			color: "lightgray",
																		}}
																	/>
																)}
															</span>
														);
													}
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
							<button
								onClick={() =>
									topRestroHandlerButton(count + 1)
								}
							>
								<FaCaretRight fontSize="3rem" />
							</button>
						</div>

						<div className="w-64 h-56 flex items-center rounded-3xl justify-center relative transition duration-300 ease transform hover:scale-105 shadow-lg">
							<img
								src={CDN_URL + restaurants.cloudinaryImageId}
								alt={restaurants.name}
								className="w-full h-full rounded-3xl p-1"
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default SliderRestro;
