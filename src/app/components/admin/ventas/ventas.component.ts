import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { map, mergeMap, Subscription, tap } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { Venta } from 'src/app/models/venta';
import { UsuarioService } from 'src/app/services/usuario.service';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit, OnDestroy {

  ventas: MatTableDataSource<Venta> = new MatTableDataSource<Venta>()
  columnasTabla: string[] = ['id','vendedor', 'producto', 'categoria', 'fecha', 'precio','actions'];

  ventasSubscription!: Subscription;
  userSubscription!: Subscription;

  vendedores: string[] = ["Pablo Garcia", "Egle Fernandez"];

  constructor(
    private ventasService: VentasService,
  ) { }

  ngOnInit(): void {
    this.loadVentas();
  }

  ngOnDestroy(): void {
    this.ventasSubscription && this.ventasSubscription.unsubscribe();
  }

  loadVentas(): void {
    this.ventasSubscription = this.ventasService.getAllVentas().subscribe(
      response => this.ventas.data = response
    )
  }

  getTotalVentas(): number {
    return this.ventas.data.map(t => t.precio).reduce((acc, value) => acc + value, 0);
  }

  filterData($event: any): void{
    this.ventas.filter = $event.target.value;
  }

  selectVendedor(event: any): void {

    let filterValues = {
      vendedor: {
        vendedor: null
      }
    };
    filterValues.vendedor.vendedor = event.value.trim().toLowerCase();

    this.ventas.filter = JSON.stringify(filterValues)
  }
}
