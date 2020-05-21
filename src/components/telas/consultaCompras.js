import React, { useState } from "react";
import {
	MDBInput,
	MDBCol,
	MDBRow,
	MDBIcon,
	MDBModal,
	MDBModalHeader,
	MDBModalBody,
} from "mdbreact";
import NumberFormat from "react-number-format";
import "./classes.css";
import { toast } from "react-toastify";
import { getCompras } from "../../services/compraService";
import { Table } from "react-bootstrap";
import { formatarData } from "../../services/dataService";

const ConsultaCompras = () => {
	const [dataInicial, setDataInicial] = useState("");
	const [dataFinal, setDataFinal] = useState("");
	const [erroDataInicial, setErroDataInicial] = useState(false);
	const [erroDataFinal, setErroDataFinal] = useState(false);
	const [compras, setCompras] = useState([]);
	const [showDetalhes, setShowDetalhes] = useState(false);
	const [livros, setLivros] = useState([]);

	const pesquisar = async () => {
		try {
			validar();
			const response = await getCompras(dataInicial, dataFinal);
			const listaCompras = response.data;
			setCompras(listaCompras);
		} catch (e) {
			toast.error(
				e.response === undefined ? e.message : e.response.data.message
			);
		}
	};

	const validar = () => {
		let erroInicial = false;
		let erroFinal = false;

		if (dataInicial === "") erroInicial = true;

		if (dataFinal === "") erroFinal = true;

		setErroDataInicial(erroInicial);
		setErroDataFinal(erroFinal);

		if (erroInicial || erroFinal) throw new Error("Preencha as datas");
	};
	const mostrarDetalhes = (index) => {
		setLivros(compras[index].livros);
		toggle();
	};

	const toggle = () => {
		setShowDetalhes(!showDetalhes);
	};

	return (
		<>
			<MDBRow>
				<MDBCol md="5">
					<MDBInput
						outline
						type="date"
						onChange={(e) => {
							setDataInicial(e.target.value);
						}}
						className={erroDataInicial ? "input-erro" : ""}
						label="Data Inicial"
					/>
				</MDBCol>
				<MDBCol md="5">
					<MDBInput
						outline
						type="date"
						onChange={(e) => {
							setDataFinal(e.target.value);
						}}
						className={erroDataFinal ? "input-erro" : ""}
						label="Data Final"
					/>
				</MDBCol>
				<MDBCol md="2" middle center>
					<button className={"button"} color="primary" onClick={pesquisar}>
						pesquisar
						<MDBIcon size="0.5x" icon="search" className={"pl-2"} />
					</button>
				</MDBCol>
			</MDBRow>
			<Table striped bordered hover size="sm">
				<thead>
					<tr>
						<th>#</th>
						<th>Data da Compra</th>
						<th>Quantidades de Livros</th>
						<th>Preço Total</th>
						<th>Ver Detalhes</th>
					</tr>
				</thead>
				<tbody>
					{compras.map((compra, index) => {
						return (
							<>
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{formatarData(compra.data)}</td>
									<td>
										{compra.livros.reduce((total, livro) => {
											return (total += livro.quantidade);
										}, 0)}
									</td>
									<td>
										<NumberFormat
											value={compra.livros.reduce((total, livro) => {
												return (total += livro.preco * livro.quantidade);
											}, 0)}
											displayType={"text"}
											prefix={"R$ "}
											decimalScale={2}
										/>
									</td>
									<td>
										<button
											onClick={() => mostrarDetalhes(index)}
											className={"button"}
										>
											<MDBIcon icon="info-circle" />
										</button>
									</td>
								</tr>
							</>
						);
					})}
				</tbody>
			</Table>

			<MDBModal isOpen={showDetalhes} size="lg" toggle={toggle}>
				<MDBModalHeader>Detalhe da Compra</MDBModalHeader>
				<MDBModalBody>
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
							</tr>
						</thead>
						<tbody>
							{livros.map((livro, index) => {
								return (
									<tr key={index}>
										<td>{index +1}</td>
										<td>{livro.nome}</td>
										<td>{livro.nomeAutor}</td>
										<td>{livro.nomeMedium}</td>
										<td>{livro.nomeEditora}</td>
										<td>{livro.quantidade}</td>
										<td>
											<NumberFormat
												value={livro.preco}
												displayType={"text"}
												prefix={"R$ "}
												decimalScale={2}
											/>
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</MDBModalBody>
			</MDBModal>
		</>
	);
};
export default ConsultaCompras;
