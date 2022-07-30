import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbmLotesComponent } from './components/admin/abm-lotes/abm-lotes.component';
import { DetalleLoteComponent } from './components/admin/detalle-lote/detalle-lote.component';
import { TableComponent } from './components/table/table.component';

const routes: Routes = [
  { path: '', component: AbmLotesComponent },
  { path: 'detalle-lote/:codigo', component: DetalleLoteComponent },
  { path: 'tabla', component: TableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
