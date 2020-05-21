import React, { useState, useEffect } from "react";
import {
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBBtn,
	MDBIcon,
	MDBInput,
} from "mdbreact";

import { postLivro, getLivro, putLivro } from "../../services/livroService";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const FormularioLivro = () => {
	const [isPosting, setIsPosting] = useState(false);
	const [nome, setNome] = useState("");
	const [nomeAutor, setNomeAutor] = useState("");
	const [nomeMedium, setNomeMedium] = useState("");
	const [nomeEditora, setNomeEditora] = useState("");
	const [preco, setPreco] = useState("");
	const { id } = useParams();

	useEffect(() => {
		if (id !== undefined) {
			setIsPosting(true);
			getLivro(id).then((data) => {
				setNome(data.nome);
				setNomeAutor(data.nomeAutor);
				setNomeEditora(data.nomeEditora);
				setNomeMedium(data.nomeMedium);
				setPreco(data.preco);
				setIsPosting(false);
			});
		}
	}, []);

	const submit = async (event) => {
		event.preventDefault();
		setIsPosting(true);
		try {
			if (id === undefined) {
				await postLivro({
					nome,
					nomeAutor,
					nomeMedium,
					nomeEditora,
					preco,
				});
				setNome("");
				setNomeAutor("");
				setNomeMedium("");
				setNomeEditora("");
			} else {
				await putLivro(id, { nome, nomeAutor, nomeMedium, nomeEditora, preco });
			}
			toast.success("Livro cadastrado com sucesso");
		} catch (e) {
			toast.error(e.response.data.message);
		}

		setIsPosting(false);
	};
	return (
		<MDBContainer>
			<MDBRow center>
				<MDBCol md="6">
					<form onSubmit={submit}>
						<MDBInput
							outline
							required
							value={nome}
							onChange={(e) => setNome(e.target.value)}
							label="Nome do Livro"
							size="lg"
						/>
						<MDBInput
							outline
							required
							value={nomeAutor}
							onChange={(e) => setNomeAutor(e.target.value)}
							label="Nome do Autor"
							size="lg"
						/>
						<MDBInput
							outline
							required
							value={nomeMedium}
							onChange={(e) => setNomeMedium(e.target.value)}
							label="Nome do Médium"
							size="lg"
						/>
						<MDBInput
							outline
							required
							value={nomeEditora}
							onChange={(e) => setNomeEditora(e.target.value)}
							label="Nome da Editora"
							size="lg"
						/>
						<MDBInput
							outline
							required
							value={preco}
							onChange={(e) => setPreco(e.target.value)}
							label="Preço"
							size="lg"
							type="number"
							min="0"
						/>

						<div className="text-center mt-4">
							{isPosting ? (
								<div className="spinner-border text-primary" role="status">
									<span className="sr-only">Loading...</span>
								</div>
							) : (
								<MDBBtn color="warning" outline type="submit">
									Salvar
									<MDBIcon icon="save" className="ml-2" />
								</MDBBtn>
							)}
						</div>
					</form>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	);
};

export default FormularioLivro;
