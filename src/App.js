import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import Header from "./components/header";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ItensMenus from "./components/itensMenu";
import { MDBContainer } from "mdbreact";
import Login from "./components/telas/login";
import { isAuthenticated } from "./services/auth";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

toast.configure();

export default function App() {
	const PrivateRouters = ItensMenus.map(
		({ url, component: Component }, key) => (
			<Route
				exact
				path={url}
				key={key}
				render={(props) =>
					isAuthenticated() ? (
						<Component {...props} />
					) : (
						<Redirect to={{ pathname: "/login", state: props.location }} />
					)
				}
			/>
		)
	);

	return (
		<div>
			<BrowserRouter>
				<Header></Header>

				<MDBContainer className="mt-5 pt-5">
					<Switch>
						<Route exact path="/" component={Login} />
						<Route exact path="/Login" component={Login} />
						{PrivateRouters}
					</Switch>
				</MDBContainer>
			</BrowserRouter>
		</div>
	);
}
