import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../layout/header/header.component';
import { HomeComponent } from '../layout/home/home.component';
import { DashboardComponent } from '../layout/dashboard/dashboard.component';
import { InformacionComponent } from '../layout/informacion/informacion.component';
import { LoginComponent } from '../layout/login/login.component';
import { MenuComponent } from '../layout/menu/menu.component';
import { PerfilComponent } from '../layout/perfil/perfil.component';
import { ProductoComponent } from '../layout/producto/producto.component';
import { SidenavComponent } from '../layout/sidenav/sidenav.component';

import { LayoutRoutingModule } from './layout-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    DashboardComponent,
    InformacionComponent,
    LoginComponent,
    MenuComponent,
    PerfilComponent,
    ProductoComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule
  ]
})
export class LayoutModule { }
