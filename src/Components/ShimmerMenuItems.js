import React from "react";
import { ShimmerPostList, ShimmerButton } from "react-shimmer-effects";

const ShimmerMenuItems = () => {
	return (
		<div>
			<div className="flex gap-6 h-auto mt-4 justify-center mx-4 text-sm font-semibold rounded-xl overflow-x-scroll whitespace-nowrap hide-scroll-bar">
				<ShimmerButton size="sm" />
				<ShimmerButton size="sm" />
				<ShimmerButton size="sm" />
				<ShimmerButton size="sm" />
				<ShimmerButton size="sm" />
				<ShimmerButton size="sm" />
				<ShimmerButton size="sm" />
				<ShimmerButton size="sm" />
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 p-6">
				<ShimmerPostList
					postStyle="STYLE_THREE"
					col={1}
				/>
				<ShimmerPostList
					postStyle="STYLE_THREE"
					col={1}
				/>
				<ShimmerPostList
					postStyle="STYLE_THREE"
					col={1}
				/>
				<ShimmerPostList
					postStyle="STYLE_THREE"
					col={1}
				/>
				<ShimmerPostList
					postStyle="STYLE_THREE"
					col={1}
				/>
			</div>
		</div>
	);
};

export default ShimmerMenuItems;
