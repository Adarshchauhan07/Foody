import React, { useEffect, useState } from "react";
import { CDN_URL } from "../Utils/constraints";
import RestaurantsCard, { withLabelRestaurantsCard } from "./RestaurantsCard";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [restaurantsName, setRestaurantsName] = useState([]);
  const [input, setInput] = useState("");

  const LabeledRestaurantsCard = withLabelRestaurantsCard(RestaurantsCard);

  const searchHandler = (e) => {
    e.preventDefault();
    const temp = restaurantsName.filter((data) =>
      data.info.name.toLowerCase().includes(input.toLowerCase())
    );
    setRestaurantsName(temp);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://foodfire.onrender.com/api/restaurants?lat=21.1702401&lng=72.83106070000001&page_type=DESKTOP_WEB_LISTING"
        );
        const json = await response.json();
        setRestaurantsName(
          json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants
        );
      } catch (error) {
        console.log("Error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center border rounded-md p-4 mb-4">
        <form>
          <input
            type="text"
            placeholder="Search the restaurant you want..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border p-2 mr-2 outline-none w-64"
          />
        </form>
        <button
          onClick={searchHandler}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
        >
          SEARCH
        </button>
      </div>

      <div className="flex flex-wrap justify-around gap-6">
        {restaurantsName.map((restaurants) => (
          <NavLink
            key={restaurants.info.id}
            to={`/Restaurants/${restaurants.info.id}`}
          >
            <LabeledRestaurantsCard
              restaurants={restaurants.info}
              className="hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            />
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Home;
