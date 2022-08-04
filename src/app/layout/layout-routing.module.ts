import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { InformacionComponent } from './informacion/informacion.component';
import { ProductoComponent } from './producto/producto.component';

const routes: Routes = [{
  path: 'dashboard',
  component: DashboardComponent,
},
{
  path: 'informacion/:id',
  component: InformacionComponent
},
{
  path: '',
  component: HomeComponent
},
{
  path: 'producto',
  component: ProductoComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
