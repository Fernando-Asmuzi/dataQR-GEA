import { Categoria, emptyCategoria } from "./categoria";
import { emptyProducto, Producto } from "./producto";
import { emptyUsuario, Usuario } from "./usuario";

export interface Venta {
    id: number;
    vendedor: Usuario;
    fecha: Date;
    precio: number;
    producto: Producto;
    categoria: Categoria;
}

export const emptyVenta = (): Venta => ({
    id: 0,
    vendedor: emptyUsuario(),
    fecha: new Date(),
    precio: 0,
    producto: emptyProducto(),
    categoria: emptyCategoria()
});