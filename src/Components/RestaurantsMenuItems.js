import React, { useEffect, useState } from "react";
import { CDN_URL } from "../Utils/constraints";
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../Redux/Slices/CartSlice";
import { BiHappyHeartEyes } from "react-icons/bi";
import toast, { Toaster } from "react-hot-toast";

const RestaurantsMenuItems = ({ category }) => {
	const dispatcher = useDispatch();
	const cartItems = useSelector((state) => state.cart.cartItems);
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 p-6">
			{category.card.card.itemCards.map((categoryMenu) => (
				<div
					key={categoryMenu.card.info.id}
					className="bg-white p-4 rounded-md shadow-md hover:shadow-lg flex flex-col "
				>
					<img
						src={CDN_URL + categoryMenu.card.info.imageId}
						alt={categoryMenu.card.info.name}
						className="w-72 h-auto p-2 rounded-xl transition duration-300 ease-in-out transform hover:scale-105"
					/>
					<div className="flex flex-col justify-between h-full">
						<div>
							<h2 className="text-lg font-semibold mb-2 overflow-hidden">
								{categoryMenu.card.info.name}
							</h2>
							<p className="text-gray-600 text-xs mb-2 overflow-hidden">
								{categoryMenu.card.info.description?.length >
								100
									? categoryMenu.card.info.description?.substring(
											0,
											100
									  ) + "..."
									: categoryMenu.card.info.description}
							</p>
						</div>
						<div className="flex justify-between items-center gap-4 px-3">
							<span className="text-base font-bold text-blue-500">
								₹
								{categoryMenu.card.info.price !== undefined
									? categoryMenu.card.info.price / 100
									: categoryMenu.card.info.variantsV2
											?.variantGroups[0]?.variations[0]
											?.price !== undefined
									? categoryMenu.card.info.variantsV2
											.variantGroups[0].variations[0]
											.price / 100
									: categoryMenu.card.info.defaultPrice / 100}
							</span>

							<button
								onClick={() => {
									if (
										!cartItems.some(
											(res) =>
												res.card.info.id ===
												categoryMenu.card.info.id
										)
									) {
										dispatcher(addItems(categoryMenu));
										console.log(cartItems);
										toast.success("Item Added To Cart");
									}
								}}
								className="text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:shadow-outline p-2 rounded-xl text-xs font-bold transition duration-300 ease-in-out transform hover:scale-105 flex items-center gap-1"
							>
								<BiHappyHeartEyes fontSize="1rem" />
								{cartItems.some(
									(res) =>
										res.card.info.id ===
										categoryMenu.card.info.id
								)
									? "ADDED"
									: "BUY NOW"}
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default RestaurantsMenuItems;
