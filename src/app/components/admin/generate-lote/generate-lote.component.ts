import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, Subscription } from 'rxjs';
import { Categoria } from 'src/app/models/categoria';
import { Diseno } from 'src/app/models/diseno';
import { emptyLote, Lote } from 'src/app/models/lote';
import { Producto } from 'src/app/models/producto';
import { CategoriasService } from 'src/app/services/categorias.service';
import { DisenoService } from 'src/app/services/diseno.service';
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
    producto: ['', [Validators.required]],
    diseno: ['', [Validators.required]]
  })
 
  showSpinner: boolean = false;

  categorias: Array<Categoria> = new Array<Categoria>();
  productos: Array<Producto> = new Array<Producto>();
  disenos: Array<Diseno> = new Array<Diseno>();

  categoriasSubscription!: Subscription;
  productosSubscription!: Subscription;
  lotesSubscription!: Subscription;
  disenosSubscription!: Subscription;

  constructor(
    private categoriasService: CategoriasService,
    private productosService: ProductosService,
    private lotesService: LotesService,
    private disenoService: DisenoService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCategorias();
    this.getProductos();
    this.getDisenos();
  }

  ngOnDestroy(): void {
    this.categoriasSubscription && this.categoriasSubscription.unsubscribe();
    this.productosSubscription && this.productosSubscription.unsubscribe();
    this.disenosSubscription && this.disenosSubscription.unsubscribe();
    this.lotesSubscription && this.lotesSubscription.unsubscribe();
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

  getDisenos(): void {
    this.disenosSubscription = this.disenoService.getAllDisenos().subscribe(
      response => this.disenos = response
    )
  }

  submitForm(): void {
    const lote: Lote = emptyLote();
    lote.cantidad = this.form.value.cantidad;
    lote.categoria = this.form.value.categoria;
    lote.producto = this.form.value.producto;
    lote.diseno = this.form.value.diseno;
    this.showSpinner = true;
    this.lotesSubscription = this.lotesService.createLote(lote).pipe(
      finalize( () => this.showSpinner = false),
    ).subscribe(
      response => {
        response ? this.snackBar.open('Lote creado','Aceptar',{duration: 1500}) : this.snackBar.open('Ocurrio un error','Aceptar',{duration: 1500})
        this.dialog.closeAll();
      }
    )
  }

}
