import type Postagem from "./Postagem";

export default interface Tema{
    id: number | undefined;
    descricao: string;
    postagem?: Postagem[] | null;
}