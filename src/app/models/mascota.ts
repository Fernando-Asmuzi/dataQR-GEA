export interface Mascota {
    id?: number;
    id_usuario: number;
    nombre: string;
    apellido: string;
    direccion_primaria: string;
    direccion_secundaria: string;
    telefono_primario: string;
    telefono_secundario: string;
    otros: string;
    provincia: string;
    pais: string;
    ciudad: string;
    especie: string;
    raza: string;
    caracteristicas: string;
    foto: string;
}

export const emptyMascota = (): Mascota => ({
    id_usuario: 0,
    nombre: '',
    apellido: '',
    direccion_primaria: '',
    direccion_secundaria: '',
    telefono_primario: '',
    telefono_secundario: '',
    otros: '',
    provincia: '',
    pais: '',
    ciudad: '',
    especie: '',
    raza: '',
    caracteristicas: '',
    foto: ''
}); 

