import ListaLivros from './telas/listaLivros';
import FormularioLivro from './telas/formularioLivro'
import CadastroCompras from './telas/cadastroCompras';
import  ConsultaCompras from './telas/consultaCompras'
import  consultaVendas from './telas/consultaVendas'

const ItensMenus = [
    {
        label: "Pesquisar Livros",
        url: "/pesquisar-livros",
        component:  ListaLivros
    },

    {
        label: "Manutenção Livros",
        icone: "",
        url: "/manutencao-livros",
        component:  FormularioLivro
    },

    {
        label: "",
        url: "/manutencao-livros/:id",
        component:  FormularioLivro
    },

    {
        label: "Cadastro de Compras",
        url: "/cadastro-compra-livros",
        component:  CadastroCompras
    },

    {
        label: "Consulta de Compras",
        url: "/consulta-compra-livros",
        component:  ConsultaCompras
    },

    {
        label: "Consulta de Vendas",
        url: "/consulta-venda-livros",
        component:  consultaVendas
    },
]

export default ItensMenus;