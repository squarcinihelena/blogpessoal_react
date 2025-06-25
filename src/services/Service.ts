import axios from "axios";

const api = axios.create({
    baseURL: "https://blogpessoal-spring-njbr.onrender.com"
})

//eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

//eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)

}