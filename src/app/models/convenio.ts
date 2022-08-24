export interface Convenio {
    id: number;
    nombre: string;
    telefono: string;
    cuit: string;
    eliminado: boolean;
    fecha?: Date;
}

export const emptyConvenio = (): Convenio => ({
    id: 0,
    nombre: '',
    telefono: '',
    cuit: '',
    eliminado: false,
    fecha: new Date(),
});