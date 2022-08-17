export interface Vinculo {
    id: number;
    nombre: String;
    apellido: String;
    descripcion: String;
    id_lote: number;
    id_familiar: number;
    fecha: Date;
}

export const emptyVinculo = (): Vinculo => ({
    id: 0,
    nombre: '',
    apellido: '',
    descripcion: '',
    id_lote: 0,
    id_familiar: 0,
    fecha: new Date(),
});