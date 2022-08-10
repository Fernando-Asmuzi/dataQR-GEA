import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, Subscription } from 'rxjs';
import { Categoria } from 'src/app/models/categoria';
import { emptyLote, Lote } from 'src/app/models/lote';
import { Producto } from 'src/app/models/producto';
import { CategoriasService } from 'src/app/services/categorias.service';
import { LotesService } from 'src/app/services/lotes.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-generate-lote',
  templateUrl: './generate-lote.component.html',
  styleUrls: ['./generate-lote.component.scss']
})
export class GenerateLoteComponent implements OnInit, OnDestroy {

  form: FormGroup = this.fb.group({
    categoria: ['', [Validators.required]],
    cantidad: ['', [Validators.required]],
    producto: ['', [Validators.required]]
  })

  showSpinner: boolean = false;

  categorias: Array<Categoria> = new Array<Categoria>();
  productos: Array<Producto> = new Array<Producto>();

  categoriasSubscription!: Subscription;
  productosSubscription!: Subscription;
  lotesSubscription!: Subscription;

  constructor(
    private categoriasService: CategoriasService,
    private productosService: ProductosService,
    private lotesService: LotesService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getCategorias();
    this.getProductos();
  }

  ngOnDestroy(): void {
    this.categoriasSubscription && this.categoriasSubscription.unsubscribe();
    this.productosSubscription && this.productosSubscription.unsubscribe();
  }

  getCategorias(): void {
    this.categoriasSubscription = this.categoriasService.getAllCategorias().subscribe(
      response => this.categorias = response
    )
  }

  getProductos(): void {
    this.productosSubscription = this.productosService.getAllProductos().subscribe(
      response => this.productos = response
    )
  }

  submitForm(): void {
    const lote: Lote = emptyLote();
    lote.cantidad = this.form.value.cantidad;
    lote.categoria = this.form.value.categoria;
    lote.producto = this.form.value.producto;
    this.showSpinner = true;
    this.lotesSubscription = this.lotesService.createLote(lote).pipe(
      finalize( () => this.showSpinner = false),
    ).subscribe(
      response => {
        response ? this.snackBar.open('Lote creado','Aceptar',{duration: 1500}) : this.snackBar.open('Ocurrio un error','Aceptar',{duration: 1500})
      }
    )
  }

}
