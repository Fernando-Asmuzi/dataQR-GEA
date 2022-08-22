import { NgModule } from '@angular/core';
import { TooltipComponent } from '@angular/material/tooltip';
import { RouterModule, Routes } from '@angular/router';
import { AbmAdminComponent } from './components/admin/abm-admin/abm-admin.component';
import { AbmCategoriasComponent } from './components/admin/abm-categorias/abm-categorias.component';
import { AbmDisenoComponent } from './components/admin/abm-diseno/abm-diseno.component';
import { AbmLotesComponent } from './components/admin/abm-lotes/abm-lotes.component';
import { AbmMarcosComponent } from './components/admin/abm-marcos/abm-marcos.component';
import { AbmProductoComponent } from './components/admin/abm-producto/abm-producto.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { DetalleLoteComponent } from './components/admin/detalle-lote/detalle-lote.component';
import { QrsComponent } from './components/admin/qrs/qrs.component';
import { TableComponent } from './components/table/table.component';
import { AdminGuard } from './guards/admin.guard';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { EmergenciaComponent } from './layout/emergencia/emergencia.component';
import { FamiliarComponent } from './layout/familiar/familiar.component';
import { InformacionComponent } from './layout/informacion/informacion.component';
import { LoginComponent } from './layout/login/login.component';
import { PerfilComponent } from './layout/perfil/perfil.component';
import { ProductoComponent } from './layout/producto/producto.component';


const routes: Routes = [
  { path: '', component: EmergenciaComponent },
  { path: ':codigo', component: InformacionComponent },
  { path: 'principal/:id', component: DashboardComponent, children: [
    // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'productos', component: ProductoComponent },
    { path: 'familiares',component: FamiliarComponent },
    { path: 'emergencia',component: EmergenciaComponent },
    // Admin area
    { path: '', component: AdminHomeComponent, canActivate: [AdminGuard] },
    { path: 'home-admin', component: AdminHomeComponent, canActivate: [AdminGuard] },
    { path: 'lotes', component: AbmLotesComponent, canActivate: [AdminGuard] },
    { path: 'detalle-lote/:codigo', component: DetalleLoteComponent, canActivate: [AdminGuard] },
    { path: 'ver-qrs/:codigo', component: QrsComponent, canActivate: [AdminGuard] },
    { path: 'abm-productos', component: AbmProductoComponent, canActivate: [AdminGuard] },
    { path: 'marcos', component: AbmMarcosComponent, canActivate: [AdminGuard] },
    { path: 'disenos', component: AbmDisenoComponent, canActivate: [AdminGuard] },
    { path: 'categorias', component: AbmCategoriasComponent, canActivate: [AdminGuard] },
    { path: 'usuarios', component: AbmAdminComponent, canActivate: [AdminGuard] },
  ] },
  { path: 'login',component: LoginComponent },
  // { path: 'productos', component: ProductoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
