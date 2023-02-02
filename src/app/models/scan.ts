import { emptyLote, Lote } from "./lote";

export interface Scan {
    id: number;
    lote: Lote;
    movimiento: string;
    fecha?: Date | null;
    email: string;
    id_usuario: number;
    nombre: string;
    apellido: string;
    latitud: number;
    longitud: number;
}

export const emptyScan = (): Scan => ({
    id: 0,
    lote: emptyLote(),
    movimiento: '',
    fecha: null,
    email: '',
    id_usuario: 0,
    nombre: '',
    apellido: '',
    latitud: 0,
    longitud: 0
});