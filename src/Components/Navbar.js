import React from "react";
import logo from "../Assets/logo.png";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { SiCarto } from "react-icons/si";

const Navbar = () => {
	const cartDataSize = useSelector((state) => state.cartItems);

	return (
		<div className="flex justify-between bg-slate-200 items-center p-1">
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
				<NavLink to="https://adarshchauhanportofolio.000webhostapp.com/#projects">ABOUT</NavLink>
				<NavLink
					className="text-2xl relative"
					to="/Cart"
				>
					<div className="flex">
						<SiCarto fontSize="4rem" />
						{cartDataSize.length > 0 && (
							<span className="text-stone-600 rounded-full inline-block animate-bounce w-5 h-5 text-xl absolute -right-4 top-1">
								{cartDataSize.length}
							</span>
						)}
					</div>
				</NavLink>
			</div>
		</div>
	);
};

export default Navbar;
