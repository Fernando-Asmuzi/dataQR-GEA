export interface Diseno {
    id: number;
    nombre: string;
    descripcion: string;
}

export const emptyDiseno = (): Diseno => ({
    id: 0,
    nombre: '',
    descripcion: ''
});