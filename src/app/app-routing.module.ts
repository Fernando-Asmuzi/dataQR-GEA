import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbmLotesComponent } from './components/admin/abm-lotes/abm-lotes.component';
import { AbmProductoComponent } from './components/admin/abm-producto/abm-producto.component';
import { DetalleLoteComponent } from './components/admin/detalle-lote/detalle-lote.component';
import { QrsComponent } from './components/admin/qrs/qrs.component';
import { TableComponent } from './components/table/table.component';

const routes: Routes = [
  { path: '', component: AbmLotesComponent },
  { path: 'detalle-lote/:codigo', component: DetalleLoteComponent },
  { path: 'ver-qrs/:codigo', component: QrsComponent },
  { path: 'tabla', component: TableComponent },
  { path: 'productos', component: AbmProductoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
