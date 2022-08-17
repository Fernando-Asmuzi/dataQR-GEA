export class Marco {
    id!: number;
    imagen!: string;
    descripcion!: string;
}

export const emptyMarco = (): Marco => ({
    id: 0,
    imagen: '',
    descripcion: 'Sin Marco'
});