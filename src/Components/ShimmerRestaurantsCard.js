import React from "react";
import { ShimmerPostList } from "react-shimmer-effects";

const ShimmerRestaurantsCard = () => {
  return (
    <div className="m-20 gap-5 ">
      <ShimmerPostList postStyle="STYLE_FOUR" col={4} row={4} gap={30} />
    </div>
  );
};

export default ShimmerRestaurantsCard;
