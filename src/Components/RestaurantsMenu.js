import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RestaurantsMenuItems from "./RestaurantsMenuItems";
import ShimmerMenuItems from "./ShimmerMenuItems";

const RestaurantsMenu = () => {
	const location = useLocation();
	const id = location.pathname.split("/").at(-1);
	const [menuData, setMenuData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [cardCategory, setCardCategory] = useState([]);
	const [activeIndex, setactiveIndex] = useState(0);

	const fetchApiMenuData = async () => {
		try {
			const fetchData = await fetch(
				`https://foodfire.onrender.com/api/menu?page-type=REGULAR_MENU&complete-menu=true&lat=21.1702401&lng=72.83106070000001&&submitAction=ENTER&restaurantId=${id}`
			);
			const jsonData = await fetchData.json();
			console.log("👉", jsonData);

			const allCards = jsonData.data.cards.find(
				(res) => res.groupedCard !== undefined
			);

			if (allCards) {
				const category =
					allCards.groupedCard.cardGroupMap.REGULAR.cards.filter(
						(res) =>
							res.card?.card?.["@type"] ===
							"type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
					);
				setMenuData(category);
				setCardCategory(category[0]);
			} else {
				setError("No grouped cards found");
			}
		} 
		catch (e) {
			setError("Error fetching menu data");
			console.error("ERROR", e);
		} finally {
			setLoading(false);
		}
	};

	function categorySortHandler(index) {
		console.log(menuData[index]);
		setCardCategory(menuData[index]);
		setactiveIndex(index);
	}

	useEffect(() => {
		fetchApiMenuData();
	}, []);

	return (
		<div>
			{loading && <ShimmerMenuItems />}
			{error && <p>Error: {error}</p>}
			{!loading && !error && (
				<div className="flex gap-6 h-auto mt-4 justify-evenly mx-4 text-sm font-semibold ">
					<ul className="flex flex-row gap-4 overflow-x-scroll whitespace-nowrap hide-scroll-bar ">
						{menuData.map((cards, index) => (
							<li
								key={cards.card.card.title}
								className={`rounded-lg ${
									index === activeIndex
										? "bg-slate-500"
										: "bg-slate-300"
								}`}
							>
								<button
									className="flex font-black text-xs text-center p-2"
									onClick={() => categorySortHandler(index)}
								>
									{cards.card.card.title}
								</button>
							</li>
						))}
					</ul>
				</div>
			)}
			{!loading && !error && cardCategory.length !== 0 && (
				<div>
					<RestaurantsMenuItems category={cardCategory} />
				</div>
			)}
		</div>
	);
};

export default RestaurantsMenu;
