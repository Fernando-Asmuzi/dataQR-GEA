import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { Vinculo } from '../../models/vinculo'
import {MatTableDataSource} from '@angular/material/table';

 const ELEMENT_DATA: Vinculo[] = []; 

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  id: String | null = '';
  vinculos: Array<Vinculo> = [];
  ELEMENT_DATA = this.vinculos;

  displayedColumns: string[] = ['Descripcion', 'Nombre', 'Apellido', 'Informacion'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private router: Router, private route: ActivatedRoute, private productoService: ProductosService) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    this.productoService.getVinculoFamiliar(Number(this.id)).subscribe(response =>{
      this.dataSource = response 
      console.log(this.dataSource)
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
