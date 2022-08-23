import { Categoria, emptyCategoria } from "./categoria";
import { Diseno, emptyDiseno } from "./diseno";
import { emptyProducto, Producto } from "./producto";

export interface Lote {
    id: number;
    categoria: Categoria;
    producto: Producto;
    diseno: Diseno;
    libre: boolean;
    fecha: Date;
    codigo: string;
    cantidad: number;
    libres?: number;
    registrados?: number;
    bloqueado: boolean;
    bloqueados?: number;
}

export const emptyLote = (): Lote => ({
    id: 0,
    categoria: emptyCategoria(),
    producto: emptyProducto(),
    diseno: emptyDiseno(),
    libre: false,
    fecha: new Date(),
    codigo: '',
    cantidad: 0,
    libres: 0,
    registrados: 0,
    bloqueado: false,
    bloqueados: 0
});
