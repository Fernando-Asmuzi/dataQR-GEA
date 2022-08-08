export interface Familiar {
    id: number;
    id_usuario: number;
    nombre: string;
    apellido: string;
    direccion_primaria: string;
    direccion_secundaria: string;
    telefono_primario: string;
    telefono_secundario: string;
    documento: string;
    diagnostico: string;
    medicacion: string;
    alergias: string;
    factor_sangre: string;
    otros: string;
    provincia: string;
    pais: string;
    ciudad: string;
}

export const emptyFamiliar = (): Familiar => ({
    id: 0,
    id_usuario: 0,
    nombre: '',
    apellido: '',
    direccion_primaria: '',
    direccion_secundaria: '',
    telefono_primario: '',
    telefono_secundario: '',
    documento: '',
    diagnostico: '',
    medicacion: '',
    alergias: '',
    factor_sangre: '',
    otros: '',
    provincia: '',
    pais: '',
    ciudad: '',
});

