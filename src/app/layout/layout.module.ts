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
import { FamiliarFormComponent } from './familiar-form/familiar-form.component';
import { AccessComponent } from '../components/admin/access/access.component';
import { AbmLotesComponent } from '../components/admin/abm-lotes/abm-lotes.component';
import { DetalleLoteComponent } from '../components/admin/detalle-lote/detalle-lote.component';
import { QrsComponent } from '../components/admin/qrs/qrs.component';
import { TableComponent } from '../components/table/table.component';
import { EstadoLotePipe } from '../pipes/estado-lote.pipe';
import { OnCreateDirective } from '../directives/on-create.directive';
import { QRCodeModule } from 'angularx-qrcode';
import { QrImageComponent } from '../components/admin/qr-image/qr-image.component';
import { GenerateLoteComponent } from '../components/admin/generate-lote/generate-lote.component';
import { AbmProductoComponent } from '../components/admin/abm-producto/abm-producto.component';
import { DialogComponent } from '../components/admin/dialog/dialog.component';
import { AbmMarcosComponent } from '../components/admin/abm-marcos/abm-marcos.component';


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
    FamiliarComponent,
    FamiliarFormComponent,
    AccessComponent,
    AbmLotesComponent,
    DetalleLoteComponent,
    QrsComponent,
    TableComponent,
    EstadoLotePipe,
    OnCreateDirective,
    QrImageComponent,
    GenerateLoteComponent,
    AbmProductoComponent,
    DialogComponent,
    AbmMarcosComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    LayoutRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    QRCodeModule
  ],
  providers: [LoginComponent],
})
export class LayoutModule { }
