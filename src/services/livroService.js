import { GET, POST, PUT } from './http'

export const postLivro = (livro) => {
    return POST("/livro", livro);
}

export const getLivros = async (filter) =>{
    const  { data } = await  GET("/livro", filter)
    return data;
}

export const getLivro = async (id) =>{
    const  { data } = await  GET("/livro/" + id)
    return data;
}

export const putLivro = async (id, livro) =>{
    return await  PUT("/livro/" + id, livro)
}
