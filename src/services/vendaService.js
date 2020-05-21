import { GET, POST } from "./http";
import { formatarDataYYYYMMDD } from './dataService'

export const venderLivro=  async(dados) =>{
    return await POST("/venda", dados)
}

export const getVendas = async (dataInicial, dataFinal) => {
    const data = await GET("/venda?dataInicial=" + formatarDataYYYYMMDD(dataInicial) +"&dataFinal=" + formatarDataYYYYMMDD(dataFinal))
    return data;
};