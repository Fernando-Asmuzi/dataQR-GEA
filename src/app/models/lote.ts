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
}

export const emptyLote = (): Lote => ({
    id: 0,
    categoria: emptyCategoria(),
    producto: emptyProducto(),
    diseno: emptyDiseno(),
    libre: false,
    fecha: new Date(),
    codigo: '',
    cantidad: 0
});
