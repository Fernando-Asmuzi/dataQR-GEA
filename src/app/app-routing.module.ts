import { NgModule } from '@angular/core';
import { TooltipComponent } from '@angular/material/tooltip';
import { RouterModule, Routes } from '@angular/router';
import { AbmLotesComponent } from './components/admin/abm-lotes/abm-lotes.component';
import { AbmMarcosComponent } from './components/admin/abm-marcos/abm-marcos.component';
import { AbmProductoComponent } from './components/admin/abm-producto/abm-producto.component';
import { DetalleLoteComponent } from './components/admin/detalle-lote/detalle-lote.component';
import { QrsComponent } from './components/admin/qrs/qrs.component';
import { TableComponent } from './components/table/table.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { EmergenciaComponent } from './layout/emergencia/emergencia.component';
import { FamiliarComponent } from './layout/familiar/familiar.component';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './layout/login/login.component';
import { PerfilComponent } from './layout/perfil/perfil.component';
import { ProductoComponent } from './layout/producto/producto.component';

const routes: Routes = [
  { path: '', component: EmergenciaComponent },
  { path: 'detalle-lote/:codigo', component: DetalleLoteComponent },
  { path: 'ver-qrs/:codigo', component: QrsComponent },
  { path: 'tabla', component: TableComponent },
  { path: 'principal/:id', component: DashboardComponent, children: [
    // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'productos', component: ProductoComponent },
    { path: 'familiares',component: FamiliarComponent },
    { path: 'emergencia',component: EmergenciaComponent },
  ] },
  { path: 'marcos', component: AbmMarcosComponent },
  { path: 'login',component: LoginComponent },
  // { path: 'productos', component: ProductoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
