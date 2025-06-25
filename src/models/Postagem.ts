import type Tema from "./Tema";
import type Usuario from "./Usuario";

export default interface Postagem{
    id: number;
    titulo: string;
    texto: string;
    data: string;
    tema: Tema | null;
    usuario: Usuario | null;
}