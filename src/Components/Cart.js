import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CDN_URL } from "../Utils/constraints";
import { removeItems } from "../Redux/Slices/CartSlice";
import { NavLink } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import EmptyCart from "../Assets/EmptyCart.png";

const Cart = () => {
	const dispatcher = useDispatch();
	const cartItems = useSelector((state) => state.cartItems);

	return (
		<div className="container mx-auto p-10">
			{cartItems.length === 0 ? (
				<NavLink
					to="/"
					className="w-full h-full text-2xl text-blue-500 flex flex-col gap-10 justify-start items-center"
				>
          <h2>ADD SOME FOOD 😋</h2>
					<img
						className="h-96 w-auto"
						src={EmptyCart}
					/>
				</NavLink>
			) : (
				
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols- xl:grid-cols-5">
					{cartItems.map((categoryMenu) => (
						<div
							key={categoryMenu.card.info.id}
							className="bg-white rounded-md shadow-md overflow-hidden mb-4"
						>
							<img
								src={CDN_URL + categoryMenu.card.info.imageId}
								alt={categoryMenu.card.info.name}
								className="w-full h-40 object-cover"
							/>
							<div className="p-4">
								<h2 className="text-lg font-semibold mb-2">
									{categoryMenu.card.info.name}
								</h2>
								<p className="text-gray-600 text-sm mb-2">
									{categoryMenu.card.info.description
										?.length > 100
										? categoryMenu.card.info.description?.substring(
												0,
												100
										  ) + "..."
										: categoryMenu.card.info.description}
								</p>
								<div className="flex justify-between items-center mt-4 ">
									<span className="text-base font-bold text-blue-500">
										₹
										{categoryMenu.card.info.price !==
										undefined
											? categoryMenu.card.info.price / 100
											: categoryMenu.card.info.variantsV2
													?.variantGroups[0]
													?.variations[0]?.price !==
											  undefined
											? categoryMenu.card.info.variantsV2
													.variantGroups[0]
													.variations[0].price / 100
											: categoryMenu.card.info
													.defaultPrice / 100}
									</span>

									<button
										onClick={() => {
											dispatcher(
												removeItems(categoryMenu)
											);
											toast.error("Item Remove");
										}}
										className="text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline"
									>
										Delete
									</button>
								</div>
							</div>
						</div>
            
					))}
				</div>



			)}
		</div>
	);
};

export default Cart;
