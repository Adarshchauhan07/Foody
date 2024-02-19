import React from "react";
import logo from "../Assets/logo.png";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
	const cartDataSize = useSelector((state) => state.cartItems);

	return (
		<div className="flex justify-between bg-slate-200 items-center p-4">
			<div className="w-24 h-24">
				<NavLink to="/">
					<img
						src={logo}
						alt="Logo"
					/>
				</NavLink>
			</div>

			<div className="flex gap-3 m-4 pr-4 font-bold text-base items-center relative">
				<NavLink to="/">HOME</NavLink>
				<NavLink to="/About">ABOUT</NavLink>
				<NavLink
					className="text-2xl relative"
					to="/Cart"
				>
					<div className="flex">
						🛒
						<span className="text-stone-600	 rounded-full">
							{cartDataSize.length}
						</span>
					</div>
				</NavLink>
			</div>
		</div>
	);
};

export default Navbar;
