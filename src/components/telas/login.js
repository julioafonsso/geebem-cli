import React, { useState } from "react";
import {
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBInput,
	MDBBtn,
	MDBCard,
	MDBCardBody,
} from "mdbreact";

import { authSignup, authLogin } from "../../services/auth";
import { toast } from "react-toastify";

const Login = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmationPassword, setConfirmationPassword] = useState("");

	const toogle = () => {
		setIsLogin(!isLogin);
		setUsername("");
		setPassword("");
		setConfirmationPassword("");
	};

	const login = async (event) => {
		try {
			event.preventDefault();

			const retorno = await authLogin(username, password);
			if (retorno) {
				window.location = "/pesquisar-livros";
			}
		} catch (e) {
			toast.error(e.response.data.message);
        }
	};

	const signUp = async (event) => {
		try {
			event.preventDefault();
			const resp = await authSignup(username, password);
			console.log(resp);
			toogle();
			
			toast.Succes("Usuario cadastrado com sucesso!");
		} catch (e) {
			toast.error(e.response.data.message);
		}
	};

	return (
		<>
			<MDBContainer>
				<MDBRow center>
					<MDBCol md="6">
						<MDBCard>
							<MDBCardBody>
								{isLogin ? (
									<form onSubmit={login}>
										<p className="h5 text-center mb-4">Login</p>
										<div className="grey-text">
											<MDBInput
												required
												label="Digite seu usuario"
												icon="envelope"
												group
												type="text"
												validate
												error="wrong"
												success="right"
												value={username}
												onChange={(e) => {
													setUsername(e.target.value);
												}}
											/>
											<MDBInput
												required
												label="Type your password"
												icon="lock"
												group
												type="password"
												validate
												value={password}
												onChange={(e) => {
													setPassword(e.target.value);
												}}
											/>
										</div>
										<div className="text-center">
											<MDBBtn type="submit" color="primary">
												Login
											</MDBBtn>
											<p className="font-small grey-text d-flex justify-content-end">
												Não tem cadastro?
												<a
													href="#!"
													onClick={toogle}
													className="blue-text ml-1"
												>
													Sign Up
												</a>
											</p>
										</div>
									</form>
								) : (
									<form onSubmit={signUp}>
										<p className="h5 text-center mb-4">Cadastro</p>
										<div className="grey-text">
											<MDBInput
												required
												label="Digite seu username"
												icon="envelope"
												group
												type="text"
												validate
												error="wrong"
												success="right"
												value={username}
												onChange={(e) => {
													setUsername(e.target.value);
												}}
											/>
											<MDBInput
												required
												label="Digite sua password"
												icon="lock"
												group
												type="password"
												validate
												value={password}
												onChange={(e) => {
													setPassword(e.target.value);
												}}
											/>
											<MDBInput
												required
												label="Confirme seu e-mail"
												icon="exclamation-triangle"
												group
												type="password"
												validate
												error="wrong"
												success="right"
												value={confirmationPassword}
												onChange={(e) => {
													setConfirmationPassword(e.target.value);
												}}
											/>
										</div>
										<div className="text-center">
											<MDBBtn type="submit" color="primary">
												Cadastrar
											</MDBBtn>
											<p className="font-small grey-text d-flex justify-content-end">
												Já tem Cadastro?
												<a
													href="#!"
													onClick={toogle}
													className="blue-text ml-1"
												>
													Login
												</a>
											</p>
										</div>
									</form>
								)}
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
			
		</>
	);
};

export default Login;
