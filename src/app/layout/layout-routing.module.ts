import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmergenciaComponent } from './emergencia/emergencia.component';
import { FamiliarComponent } from './familiar/familiar.component';
import { HomeComponent } from './home/home.component';
import { InformacionComponent } from './informacion/informacion.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { ProductoComponent } from './producto/producto.component';
import { SidenavComponent } from './sidenav/sidenav.component';




const routes: Routes = [
{path: '', component: HomeComponent},
{path: 'dashboard/:id',component: DashboardComponent},
{path: 'informacion/:id',component: InformacionComponent},
{path: 'producto',component: ProductoComponent},
{path: 'login',component: LoginComponent},
{path: 'principal/:id',component: SidenavComponent},
{path: 'familiares/:id',component: FamiliarComponent},
{path: 'emergencia',component: EmergenciaComponent}    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
