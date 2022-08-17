export interface Categoria {
    id: number;
    categoria: string;
}

export const emptyCategoria = (): Categoria => ({
    id: 0,
    categoria: ''
});