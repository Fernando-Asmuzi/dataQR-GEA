import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* components */
import { HeaderComponent } from '../layout/header/header.component';
import { HomeComponent } from '../layout/home/home.component';
import { DashboardComponent } from '../layout/dashboard/dashboard.component';
import { InformacionComponent } from '../layout/informacion/informacion.component';
import { LoginComponent } from '../layout/login/login.component';
import { PerfilComponent } from '../layout/perfil/perfil.component';
import { ProductoComponent } from '../layout/producto/producto.component';
import { EmergenciaComponent } from './emergencia/emergencia.component';
import { FamiliarComponent } from './familiar/familiar.component';

/* routing */
import { LayoutRoutingModule } from './layout-routing.module';

/* material module */
import { MaterialModule } from './material.module';


@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    DashboardComponent,
    InformacionComponent,
    LoginComponent,
    PerfilComponent,
    ProductoComponent,
    EmergenciaComponent,
    FamiliarComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    LayoutRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  providers: [LoginComponent],
})
export class LayoutModule { }
