import React, { useState } from "react";
import { Table } from "react-bootstrap";

import { getLivros } from "../../services/livroService";
import "./classes.css";

import { getDataAtual } from "../../services/dataService";

import {
	MDBIcon,
	MDBModal,
	MDBModalHeader,
	MDBModalBody,
	MDBCol,
} from "mdbreact";

import { postCompras } from "../../services/compraService";
import { toast } from "react-toastify";

const CadastroCompras = () => {
	const [isSearching, setIsSearching] = useState(false);
	const [livros, setLivros] = useState([]);
	const [listaCompras, setListaCompras] = useState([]);
	const [filter, setFilter] = useState("");
	const [showModal, setShowModal] = useState(false);

	const search = async (event) => {
		const valor = event.target.value;
		setFilter(event.target.value);
		if (valor.length === 3) {
			setFilter("");
			setIsSearching(true);
			toggle();
			try {
				const retorno = await getLivros({ filter: valor });
				setIsSearching(false);
				setLivros(retorno);
			} catch (e) {
				setIsSearching(false);
			}
		}
	};
	const incluirLista = (livro) => {
		const retorno = listaCompras.filter((item) => {
			return item._id === livro._id;
		});

		if (retorno.length === 0)
			setListaCompras([
				...listaCompras,
				{
					...livro,
					quantidade: 0,
					preco: 0,
				},
			]);
	};

	const removeLista = (livro) => {
		setListaCompras(
			listaCompras.filter((item) => {
				return item._id !== livro._id;
			})
		);
	};

	const finalizar = async () => {
		

		try {
			validaCompra();
			await postCompras(getDadosCompra());
			toast.success("Compra cadastrada com sucesso.");
			setListaCompras([]);
		} catch (e) {
			toast.error(e.response === undefined ? e.message : e.response.data.message );
		}
	};

	const validaCompra = () => {
		let lista = listaCompras.map((livro) => {
			let erroQtd = livro.quantidade < 1;
			let erroPreco = livro.preco < 0;
			return {
				...livro,
				erroPreco,
				erroQtd,
			};
		});
		setListaCompras(lista);
		lista.map((livro) => {
			if (livro.erroQtd || livro.setQuantidade) {
				throw new Error("Preencher os campos em vermelho");
			}
			return 1;
		});
	};

	const getDadosCompra = () => {
		let objeto = {
			data: getDataAtual(),
			livros: listaCompras.map((livro) => {
				return {
					idLivro: livro._id,
					preco: livro.preco,
					quantidade: livro.quantidade,
				};
			}),
		};
		return objeto;
	};
	const setQuantidade = (index, value) => {
		let erroQtd = value < 1;
		setListaCompras(
			listaCompras.map((livro, indexLista) => {
				return index === indexLista
					? {
							...livro,
							quantidade: value,
							erroQtd: erroQtd,
					  }
					: livro;
			})
		);
	};

	const setPreco = (index, value) => {
		setListaCompras(
			listaCompras.map((livro, indexLista) => {
				return index === indexLista
					? {
							...livro,
							preco: value,
					  }
					: livro;
			})
		);
	};

	const toggle = () => {
		setShowModal(!showModal);
	};
	return (
		<>
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
						value={filter}
						onChange={(e) => search(e)}
					/>
				</div>
			</MDBCol>

			<MDBCol md="12" middle>
				<Table striped bordered hover size="sm">
					<thead>
						<tr>
							<th>#</th>
							<th>Nome Livro</th>
							<th>Nome Autor</th>
							<th>Nome Medium</th>
							<th>Nome Editora</th>
							<th>Quantidade</th>
							<th>Preço</th>
							<th>Remover</th>
						</tr>
					</thead>
					<tbody>
						{listaCompras.map((livro, index) => {
							return (
								<tr key={index}>
									<td>{index}</td>
									<td>{livro.nome}</td>
									<td>{livro.nomeAutor}</td>
									<td>{livro.nomeMedium}</td>
									<td>{livro.nomeEditora}</td>
									<td>
										<input
											type="number"
											step="1"
											min="0"
											value={livro.quantidade}
											onChange={(e) => setQuantidade(index, e.target.value)}
											className={livro.erroQtd ? "input-erro" : ""}
										/>
									</td>
									<td>
										<input
											type="number"
											step="0.01"
											min="0"
											value={livro.preco}
											onChange={(e) => setPreco(index, e.target.value)}
											className={livro.erroPreco ? "input-erro" : ""}
										/>
									</td>

									<td>
										<button onClick={() => removeLista(livro)}>
											<MDBIcon icon="trash" />
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>

				<button
					className={"button"}
					color="primary"
					onClick={finalizar}
				>
					Finalizar Compra
				</button>
			</MDBCol>

			<MDBModal isOpen={showModal} size="lg" toggle={toggle}>
				<MDBModalHeader>Pesquisar Livro</MDBModalHeader>
				<MDBModalBody>
					{isSearching ? (
						<div className="spinner-border text-primary" role="status">
							<span className="sr-only">Loading...</span>
						</div>
					) : (
						<Table striped bordered hover size="sm">
							<thead>
								<tr>
									<th>#</th>
									<th>Nome Livro</th>
									<th>Nome Autor</th>
									<th>Nome Medium</th>
									<th>Nome Editora</th>
									<th>Adicionar</th>
								</tr>
							</thead>
							<tbody>
								{livros.map((livro, index) => {
									return (
										<tr key={index}>
											<td>{index}</td>
											<td>{livro.nome}</td>
											<td>{livro.nomeAutor}</td>
											<td>{livro.nomeMedium}</td>
											<td>{livro.nomeEditora}</td>
											<td>
												<button onClick={() => incluirLista(livro)}>
													<MDBIcon icon="plus-circle" />
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					)}
				</MDBModalBody>
			</MDBModal>
		</>
	);
};

export default CadastroCompras;
