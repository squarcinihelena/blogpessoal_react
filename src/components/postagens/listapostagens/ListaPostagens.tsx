import { useNavigate } from "react-router-dom";
import CardPostagens from "../cardpostagens/CardPostagens";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { DNA } from "react-loader-spinner";
import type Postagem from "../../../models/Postagem";

function ListaPostagens() {

    const navigate = useNavigate();

    const [postagens, setPostagens] = useState<Postagem[]>([]);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarPostagens() {
        try {
            await buscar('/postagens', setPostagens, {
                headers: {
                    Authorization: token,
                },
            })

        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado')
            navigate('/');
        }
    }, [token])

    useEffect(() => {
        buscarPostagens()
    }, [postagens.length])

    return (
        <>
            {postagens.length === 0 && (
                <DNA
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper mx-auto"
                />
            )}
            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col mx-2">
                    <div className='container mx-auto my-4 
                        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
                    >
                        {postagens.map((postagem) => (
                            <CardPostagens key={postagem.id} postagem={postagem} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaPostagens;