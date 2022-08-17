import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmergenciaComponent } from './emergencia/emergencia.component';
import { FamiliarFormComponent } from './familiar-form/familiar-form.component';
import { FamiliarComponent } from './familiar/familiar.component';
import { HomeComponent } from './home/home.component';
import { InformacionComponent } from './informacion/informacion.component';
import { LoginComponent } from './login/login.component';
import { ProductoComponent } from './producto/producto.component';






const routes: Routes = [
{path: '', component: HomeComponent},
{path: 'login',component: LoginComponent},
{path: 'principal/:id',component: DashboardComponent},
{path: 'familiares',component: FamiliarComponent},
{path: 'emergencia',component: EmergenciaComponent}    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
