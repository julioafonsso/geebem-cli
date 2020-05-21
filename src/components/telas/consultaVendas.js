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
import { getVendas } from "../../services/vendaService";
import { Table } from "react-bootstrap";
import { formatarData } from "../../services/dataService";

const ConsultaVendas = () => {
	const [dataInicial, setDataInicial] = useState("");
	const [dataFinal, setDataFinal] = useState("");
	const [erroDataInicial, setErroDataInicial] = useState(false);
	const [erroDataFinal, setErroDataFinal] = useState(false);
	const [vendas, setVendas] = useState([]);
	const [showDetalhes, setShowDetalhes] = useState(false);
	const [livros, setLivros] = useState([]);

	const pesquisar = async () => {
		try {
			validar();
			const response = await getVendas(dataInicial, dataFinal);
			const listaVendas = response.data;
			setVendas(listaVendas);
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
		setLivros(vendas[index].livros);
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
                        <th>Data Venda</th>
						<th>Nome Livro</th>
						<th>Nome Autor</th>
						<th>Nome Medium</th>
						<th>Nome Editora</th>
						<th>Quantidade</th>
						<th>Preço</th>
					</tr>
				</thead>
				<tbody>
					{vendas.map((venda, indexVenda) => {
						return venda.livros.map((livro, indexLivro) => {
							return (
								<tr key={(indexVenda + 1) * (indexLivro +1)}>
									<td>{(indexVenda + 1) * (indexLivro +1)}</td>
                                    <td>{formatarData(venda.data)}</td>
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
						});
					})}
				</tbody>
			</Table>

			<MDBModal isOpen={showDetalhes} size="lg" toggle={toggle}>
				<MDBModalHeader>Detalhe da Venda</MDBModalHeader>
				<MDBModalBody></MDBModalBody>
			</MDBModal>
		</>
	);
};
export default ConsultaVendas;
