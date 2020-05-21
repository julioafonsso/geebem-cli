import React, { useState } from "react";
import {
	MDBNavbar,
	MDBNavbarBrand,
	MDBNavbarNav,
	MDBNavbarToggler,
	MDBCollapse,
	MDBNavItem,
	MDBNavLink,
} from "mdbreact";
import ItensMenus from "./itensMenu";
import { useLocation } from "react-router-dom";

const Header = () => {
	const [collapse, setCollapse] = useState(false);
	const location = useLocation();
	const toogle = () => {
		setCollapse(!collapse);
	};

	const isCurrentLocal = (url) => {
		return location.pathname === url;
	};

	return (
		<>
			<header>
				<MDBNavbar color="indigo" dark expand="md" fixed="top">
					<MDBNavbarBrand href="/">
						<strong>Livraria GEEBEM</strong>
					</MDBNavbarBrand>
					{<MDBNavbarToggler onClick={toogle} />}
					<MDBCollapse isOpen={collapse} navbar>
						<MDBNavbarNav left>
							{ItensMenus.map((item, index) => {
								return item.label.length > 0 ? (
									<MDBNavItem active={isCurrentLocal(item.url)} key={index}>
										<MDBNavLink onClick={toogle} to={item.url}>
											{item.label}
										</MDBNavLink>
									</MDBNavItem>
								) : null;
							})}
						</MDBNavbarNav>
					</MDBCollapse>
				</MDBNavbar>
			</header>
		</>
	);
};

export default Header;
