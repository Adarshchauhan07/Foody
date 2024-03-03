import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import React, { useState } from "react";
import { CDN_URL } from "../Utils/constraints";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";

const RestaurantsCard = ({ restaurants }) => {
	const header = restaurants?.aggregatedDiscountInfoV3?.header;
	const subheader = restaurants?.aggregatedDiscountInfoV3?.subHeader;

	return (
		<div>
			<div
				className="h-96 bg-white rounded-md p-3 shadow-md "
			>
				<div className="flex items-center justify-center relative transition duration-300 ease transform hover:scale-105">
					<img
						src={CDN_URL + restaurants.cloudinaryImageId}
						alt={restaurants.name}
						className="w-72 h-auto rounded-2xl p-2"
					/>
					{header && subheader && (
						<div className="ribbon absolute mt-2 ml-4">
							<h2 className="text-xs font-black text-zinc-900">
								{header}
							</h2>
							<h2 className="text-xs font-black text-zinc-900">
								{subheader}
							</h2>
						</div>
					)}
				</div>

				<div className="p-4">
					<h3 className="text-xl font-semibold mb-2">
						{restaurants.name}
					</h3>
					<div className="text-gray-600 mb-2 italic text-xs">
						{restaurants.cuisines.map((res, index) => {
							return <span>{res}, </span>;
						})}
					</div>
					<div className="flex flex-row items-center mb-4">
						<CiLocationOn />
						<h6 className="text-sm text-gray-500">
							{restaurants.areaName}
						</h6>
					</div>

					<div className="flex items-center mb-2 justify-between text-sm">
						<span className="ml-1 flex text-emerald-500	">
							{Array.from({ length: 5 }).map((_, index) => {
								const starValue = index + 1;
								if (
									starValue <=
									parseFloat(restaurants.avgRatingString)
								) {
									// Full star
									return <FaStar key={index} />;
								} else if (
									starValue - 0.5 ===
									parseFloat(restaurants.avgRatingString)
								) {
									// Half star
									return <FaStarHalfAlt key={index} />;
								} else {
									// Empty star
									return (
										<FaStar
											key={index}
											style={{ color: "lightgray" }}
										/>
									);
								}
							})}
						</span>
						<div className="flex items-center gap-2">
							<MdOutlineDeliveryDining />
							<h4 className="text-gray-700">
								{restaurants?.sla?.slaString}
							</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export const withLabelRestaurantsCard = (RestaurantsCard) => {
	return (restaurants) => {
		return (
			<div>
				<RestaurantsCard {...restaurants} />
			</div>
		);
	};
};

export default RestaurantsCard;
