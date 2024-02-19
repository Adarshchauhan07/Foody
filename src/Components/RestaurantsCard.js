import React from "react";
import { CDN_URL } from "../Utils/constraints";

const RestaurantsCard = ({ restaurants }) => {
  return (
    <div className="w-96 h-auto bg-white rounded-md p-3 shadow-md hover:shadow-lg">
      <img
        src={CDN_URL + restaurants.cloudinaryImageId}
        alt={restaurants.name}
        className="w-full h-40 object-cover p-2 transition duration-300 ease-in-out transform hover:scale-105"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{restaurants.name}</h3>
        <div className="text-gray-600 mb-2">{restaurants.cuisines}</div>
        <h6 className="text-sm text-gray-500 mb-4">{restaurants.areaName}</h6>

        <div className="flex items-center mb-2 justify-between text-sm">
          <span className="ml-1">⭐{restaurants.avgRatingString}</span>

          <div className="flex gap-10">
            <h4 className="text-gray-700 mb-2">{restaurants?.sla?.slaString}</h4>
            <div className="text-base font-semibold text-blue-600">
              {restaurants.costForTwo}
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
        {/* <label>Promoted</label> */}
        <RestaurantsCard {...restaurants} />
      </div>
    );
  };
};

export default RestaurantsCard;
