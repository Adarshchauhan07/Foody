import React, { useEffect } from "react";
import { CDN_URL } from "../Utils/constraints";
import { useDispatch, useSelector } from "react-redux";
import { addItems, removeItems } from "../Redux/Slices/CartSlice";

const RestaurantsMenuItems = ({ category }) => {
	const dispatcher = useDispatch();
	const cartItems = useSelector((state) => state.cartItems);

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
						className="w-full h-full object-cover mb-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
					/>
					<div className="flex flex-col justify-between h-full">
						<div>
							<h2 className="text-lg font-semibold mb-2 overflow-hidden">
								{categoryMenu.card.info.name}
							</h2>
							<p className="text-gray-600 text-sm mb-2 overflow-hidden">
								{categoryMenu.card.info.description?.length >
								100
									? categoryMenu.card.info.description?.substring(
											0,
											100
									  ) + "..."
									: categoryMenu.card.info.description}
							</p>
						</div>
						<div className="flex justify-between items-center gap-4">
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
									: categoryMenu.card.info.defaultPrice/100}
							</span>
							<button
								onClick={() => {
									dispatcher(
										addItems(categoryMenu)
									);
									console.log(cartItems);
								}}
								className=" text-white  rounded hover:bg-slate-100 focus:outline-none focus:shadow-outline text-3xl	"
							>
								🛒
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default RestaurantsMenuItems;
