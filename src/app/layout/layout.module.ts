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
import { AccessComponent } from '../components/admin/access/access.component';
import { AbmLotesComponent } from '../components/admin/abm-lotes/abm-lotes.component';
import { DetalleLoteComponent } from '../components/admin/detalle-lote/detalle-lote.component';
import { QrsComponent } from '../components/admin/qrs/qrs.component';
import { TableComponent } from '../components/table/table.component';
import { EstadoLotePipe } from '../pipes/estado-lote.pipe';
import { OnCreateDirective } from '../directives/on-create.directive';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { QRCodeModule } from 'angularx-qrcode';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

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
    SidenavComponent,
    AccessComponent,
    AbmLotesComponent,
    DetalleLoteComponent,
    QrsComponent,
    TableComponent,
    EstadoLotePipe,
    OnCreateDirective
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    QRCodeModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class LayoutModule { }
