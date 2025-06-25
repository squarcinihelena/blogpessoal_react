import { useState, useContext, type ChangeEvent, type FormEvent, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import type Tema from "../../../models/Tema"
import { atualizar, buscar, cadastrar } from "../../../services/Service"
import { RotatingLines } from "react-loader-spinner"

function FormTema() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    const [tema, setTema] = useState<Tema>({} as Tema)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>()

    async function buscarTemaPorId(id: string){
        try{   
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token}
            })
    
        } catch (error: any){
            if(error.toString().includes("401")){
                handleLogout()
            }
        }
    }

    useEffect(()=>{
        if (token === ""){
            alert("Você precisa estar logado!")
            navigate("/")
        }
    }, [token])

    useEffect(()=>{
        if(id !== undefined){
            buscarTemaPorId(id)
        }else{
            setTema({
                id: undefined,
                descricao: "",
            })
        }
    }, [id])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
		setTema({
			...tema,
			[e.target.name]: e.target.value,
		})
	}

    async function gerarNovoTema(e: FormEvent<HTMLFormElement>){
        
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined){
            try{
                await atualizar("/temas", tema, setTema, {
                    headers: { Authorization: token }
                })

                alert("O Tema foi atualizado com sucesso!")
            }catch(error: any){
                if(error.toString().includes("401")){
                    handleLogout()
                } else {
                    alert("Erro ao atualizar o tema!")
                    console.error(error)
                }
            }
        }else{
            try{
                await cadastrar("/temas", tema, setTema, {
                    headers: { Authorization: token }
                })

                alert("O Tema foi cadastrado com sucesso!")
            }catch(error: any){
                if(error.toString().includes("401")){
                    handleLogout()
                } else {
                    alert("Erro ao cadastrar o tema!")
                    console.error(error)
                }
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar(){
        navigate("/temas")
    }

    return (
        <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8">
                {id === undefined ? "Cadastrar Tema" : "Editar Tema"}
            </h1>

            <form 
                className="w-1/2 flex flex-col gap-4" 
                onSubmit={gerarNovoTema}
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao">Descrição do Tema</label>
                    <input
                        type="text"
                        placeholder="Descreva aqui seu tema"
                        name='descricao'
                        className="border-2 border-slate-700 rounded p-2"
                        value={tema.descricao}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <button
                    className="rounded text-slate-100 bg-indigo-400 
                               hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
                    type="submit">
                    
                    {
                        isLoading ? 

                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        />
                        :
                        <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
                        
                    }
                    
                </button>
            </form>
        </div>
    );
}

export default FormTema;