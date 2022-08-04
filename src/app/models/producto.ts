export interface Producto {
    id: number;
    producto: string;
    imagen: string;
}

export const emptyProducto = (): Producto => ({
    id: 0,
    producto: '',
    imagen: ''
});