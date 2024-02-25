import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CDN_URL } from "../Utils/constraints";
import RestaurantsMenuItems from "./RestaurantsMenuItems";

const RestaurantsMenu = () => {
	const location = useLocation();
	const id = location.pathname.split("/").at(-1);
	const [menuData, setMenuData] = useState([]);

	const fetchApiMenuData = async () => {
		try {
			const fetchData = await fetch(
				`https://foodfire.onrender.com/api/menu?page-type=REGULAR_MENU&complete-menu=true&lat=21.1702401&lng=72.83106070000001&&submitAction=ENTER&restaurantId=${id}`
			);
			const jsonData = await fetchData.json();

			console.log("👉", jsonData);

			const allCards = jsonData.data.cards.find((res) => {
				return res.groupedCard !== undefined;
			});

			console.log("👉", allCards);

			const category =
				allCards.groupedCard.cardGroupMap.REGULAR.cards.filter(
					(res) =>
						res.card?.card?.["@type"] ===
						"type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
				);
			setMenuData(category);
		} catch (e) {
			console.error("ERROR", e);
		}
	};

	useEffect(() => {
		fetchApiMenuData();
	}, []);

	return (
		<div className="grid gap-6 p-32">
			{menuData.map((category, index) => (
				<div
					key={index}
					className="bg-white p-4 rounded-md shadow-md "
				>
					<h2 className="text-lg font-semibold mb-2 ">
						{category.card.card.title}
						<RestaurantsMenuItems category={category} />
					</h2>
				</div>
			))}
		</div>
	);
};

export default RestaurantsMenu;
