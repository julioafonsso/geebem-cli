export const getDataAtual = () => {
	let data = new Date();
	let dia = String(data.getDay()).padStart(2, "0");
	let mes = String(data.getMonth()).padStart(2, "0");
	let ano = data.getFullYear();

	return dia + "/" + mes + "/" + ano;
};

export const formatarData = (d) => {
	let data = new Date(d);
	return data.toLocaleString().substr(0,10);
};

export const formatarDataYYYYMMDD= (dataParm)  =>{
	let campos = dataParm.split("-")
	return campos[2] + "/" + campos[1] + "/" + campos[0];
}

