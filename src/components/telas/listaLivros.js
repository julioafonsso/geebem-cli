import React, { useState } from "react";
import {
	MDBCard,
	MDBCardBody,
	MDBCardImage,
	MDBCardText,
	MDBRow,
	MDBCol,
	MDBIcon,
	MDBAlert,
	MDBModal,
	MDBModalHeader,
	MDBModalBody,
	MDBModalFooter,
	MDBBtn,
} from "mdbreact";

import { Link } from "react-router-dom";

import { getLivros } from "../../services/livroService";
import { venderLivro } from "../../services/vendaService";
import { getDataAtual } from "../../services/dataService";
import { toast } from "react-toastify";

const ListaLivros = () => {
	const [showAlert, setShowAlert] = useState(true);
	const [isSearching, setIsSearching] = useState(false);
	const [livros, setLivros] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [vendaLivro, setVendaLivro] = useState({});

	const search = async (event) => {
		const valor = event.target.value;
		if (valor.length === 3 && showAlert) {
			setShowAlert(false);
			setIsSearching(true);
			try {
				const retorno = await getLivros({ filter: valor });
				setIsSearching(false);
				setLivros(retorno);
			} catch (e) {
				setIsSearching(false);
			}
		} else if (valor.length < 3 && !showAlert) {
			setShowAlert(true);
			setLivros([]);
		}
	};

	const vender = (livro) => {
		setVendaLivro(livro);
		setShowModal(true);
	};

	const confirmar = async () => {
		try {
			console.log(getDadosVenda())
			await venderLivro(getDadosVenda());

			toast.success("Venda cadastrada com sucesso!");
		} catch (e) {
			toast.error(e.response.data.message);
		}
		setShowModal(false);
	};

	const getDadosVenda = () => {
		return {
			data: getDataAtual(),
			livros: [{ idLivro: vendaLivro._id, quantidade: 1 }],
		};
	};
	return (
		<>
			<MDBModal isOpen={showModal} size="sm">
				<MDBModalHeader>Confirmação Venda</MDBModalHeader>
				<MDBModalBody>Confirma a venda do livro {vendaLivro.nome}</MDBModalBody>
				<MDBModalFooter>
					<MDBBtn color="primary" size="sm" onClick={() => confirmar()}>
						Confirmar Venda
					</MDBBtn>
					<MDBBtn
						color="secondary"
						size="sm"
						onClick={() => setShowModal(false)}
					>
						Não confirmar
					</MDBBtn>
				</MDBModalFooter>
			</MDBModal>

			<MDBRow center>
				<MDBCol md="12" middle>
					<div className="input-group md-form form-sm form-1 pl-0">
						<div className="input-group-prepend">
							<span
								className="input-group-text purple lighten-3"
								id="basic-text1"
							>
								<MDBIcon className="text-white" icon="search" />
							</span>
						</div>
						<input
							className="form-control my-0 py-1"
							type="text"
							placeholder="Search"
							aria-label="Search"
							onChange={(e) => search(e)}
						/>
					</div>
					{showAlert ? (
						<MDBAlert color="info">
							Digite as 3 primeiras letras do nome do livro, autor ou medium...
						</MDBAlert>
					) : null}
					{isSearching ? (
						<div className="spinner-border text-primary" role="status">
							<span className="sr-only">Loading...</span>
						</div>
					) : null}
				</MDBCol>

				{livros.map((livro, index) => {
					return (
						<MDBCol md="4" key={index}>
							<MDBCard className="mb-4">
								<MDBCardImage
									className="blue-gradient white-text d-flex justify-content-center align-items-center flex-column p-4 rounded"
									tag="div"
								>
									<h2>{livro.nome}</h2>
								</MDBCardImage>

								<MDBCardBody cascade className="text-center">
									<MDBCardText>
										Autor: {livro.nomeAutor} <br></br>
										Medium : {livro.nomeMedium} <br></br>
										Editora : {livro.nomeEditora}
									</MDBCardText>
								</MDBCardBody>
								<div className="rounded-bottom mdb-color lighten-3 text-center pt-3">
									<ul className="list-unstyled list-inline font-small">
										<li className="list-inline-item pr-2">
											<MDBIcon icon="dollar-sign" className="pr-2" />
											{livro.preco}
										</li>
										<li className="list-inline-item pr-2">
											<MDBIcon icon="book" className="pr-2" />
											{livro.quantidade}
										</li>

										<li className="list-inline-item pr-2">
											<a href="#" onClick={() => vender(livro)}>
												<MDBIcon icon="shopping-cart" />
												Cadastrar Venda
											</a>
										</li>
										<li className="list-inline-item pr-2">
											<Link to={"/manutencao-livros/" + livro.id}>
												<MDBIcon far icon="edit" />
												Editar Livro
											</Link>
										</li>
									</ul>
								</div>
							</MDBCard>
						</MDBCol>
					);
				})}
			</MDBRow>
		</>
	);
};

export default ListaLivros;
