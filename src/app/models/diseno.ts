export interface Diseno {
    id: number;
    nombre: string;
    descripcion: string;
}

export const emptyCategoria = (): Diseno => ({
    id: 0,
    nombre: '',
    descripcion: ''
});