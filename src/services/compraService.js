import { GET, POST } from "./http";
import { formatarDataYYYYMMDD } from './dataService'

export const postCompras = (compras) => {
	return POST("/compra", compras);
};

export const getCompras = async (dataInicial, dataFinal) => {
    const data = await GET("/compra?dataInicial=" + formatarDataYYYYMMDD(dataInicial) +"&dataFinal=" + formatarDataYYYYMMDD(dataFinal))
    return data;
};
