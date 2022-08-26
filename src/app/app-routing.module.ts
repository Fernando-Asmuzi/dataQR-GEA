import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbmAdminComponent } from './components/admin/abm-admin/abm-admin.component';
import { AbmCategoriasComponent } from './components/admin/abm-categorias/abm-categorias.component';
import { AbmConvenioComponent } from './components/admin/abm-convenio/abm-convenio.component';
import { AbmDisenoComponent } from './components/admin/abm-diseno/abm-diseno.component';
import { AbmLotesComponent } from './components/admin/abm-lotes/abm-lotes.component';
import { AbmMarcosComponent } from './components/admin/abm-marcos/abm-marcos.component';
import { AbmProductoComponent } from './components/admin/abm-producto/abm-producto.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { DetalleLoteComponent } from './components/admin/detalle-lote/detalle-lote.component';
import { QrsComponent } from './components/admin/qrs/qrs.component';
import { AdminGuard } from './guards/admin.guard';
import { UsuarioGuard } from './guards/usuario.guard';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { EmergenciaComponent } from './layout/emergencia/emergencia.component';
import { FamiliarComponent } from './layout/familiar/familiar.component';
import { InformacionComponent } from './layout/informacion/informacion.component';
import { LoginComponent } from './layout/login/login.component';
import { ProductoComponent } from './layout/producto/producto.component';


const routes: Routes = [
  { path: 'login',component: LoginComponent },
  { path: '', component: EmergenciaComponent },
  { path: ':codigo', component: InformacionComponent },
  { path: 'principal/:id', component: DashboardComponent, children: [
    // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'familiares',component: FamiliarComponent, canActivate: [UsuarioGuard] },
    { path: 'productos', component: ProductoComponent, canActivate: [UsuarioGuard] },
    { path: 'emergencia',component: EmergenciaComponent, canActivate: [UsuarioGuard] },
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
    { path: 'convenios', component: AbmConvenioComponent, canActivate: [AdminGuard] },
  ] },
  
  // { path: 'productos', component: ProductoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
