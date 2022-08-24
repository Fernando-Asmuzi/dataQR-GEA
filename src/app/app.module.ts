import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './layout/header/header.component';
import { MaterialModule } from './layout/material.module';
import { QrImageComponent } from './components/admin/qr-image/qr-image.component';
import { GenerateLoteComponent } from './components/admin/generate-lote/generate-lote.component';
import { AbmProductoComponent } from './components/admin/abm-producto/abm-producto.component';
import { DialogComponent } from './components/admin/dialog/dialog.component';
import { AbmMarcosComponent } from './components/admin/abm-marcos/abm-marcos.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { AbmLotesComponent } from './components/admin/abm-lotes/abm-lotes.component';
import { AccessComponent } from './components/admin/access/access.component';
import { FamiliarFormComponent } from './layout/familiar-form/familiar-form.component';
import { PerfilComponent } from './layout/perfil/perfil.component';
import { LoginComponent } from './layout/login/login.component';
import { InformacionComponent } from './layout/informacion/informacion.component';
import { ProductoComponent } from './layout/producto/producto.component';
import { EmergenciaComponent } from './layout/emergencia/emergencia.component';
import { FamiliarComponent } from './layout/familiar/familiar.component';
import { DetalleLoteComponent } from './components/admin/detalle-lote/detalle-lote.component';
import { QrsComponent } from './components/admin/qrs/qrs.component';
import { TableComponent } from './components/table/table.component';
import { EstadoLotePipe } from './pipes/estado-lote.pipe';
import { OnCreateDirective } from './directives/on-create.directive';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { NamePipe } from './pipes/name.pipe';
import { AbmDisenoComponent } from './components/admin/abm-diseno/abm-diseno.component';
import { GenerateDisenoComponent } from './components/admin/generate-diseno/generate-diseno.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AbmCategoriasComponent } from './components/admin/abm-categorias/abm-categorias.component';
import { GenerateProductoComponent } from './components/admin/generate-producto/generate-producto.component';
import { GenerateCategoriaComponent } from './components/admin/generate-categoria/generate-categoria.component';
import { GenerateMarcoComponent } from './components/admin/generate-marco/generate-marco.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CardLoteComponent } from './components/admin/card-lote/card-lote.component';
import { AbmAdminComponent } from './components/admin/abm-admin/abm-admin.component';
import { GenerateVinculacionComponent } from './layout/generate-vinculacion/generate-vinculacion.component';
import { AdminPipe } from './pipes/admin.pipe';
import { LoteBloqueadoPipe } from './pipes/lote-bloqueado.pipe';
import { ViewQRComponent } from './components/admin/view-qr/view-qr.component';
import { GenerateConvenioComponent } from './components/admin/generate-convenio/generate-convenio.component';
import { AbmConvenioComponent } from './components/admin/abm-convenio/abm-convenio.component';
import { DeleteLoteComponent } from './components/admin/delete-lote/delete-lote.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
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
    AbmMarcosComponent,
    NamePipe,
    AbmDisenoComponent,
    GenerateDisenoComponent,
    AdminHomeComponent,
    AbmCategoriasComponent,
    GenerateProductoComponent,
    GenerateCategoriaComponent,
    GenerateMarcoComponent,
    CardLoteComponent,
    AbmAdminComponent,
    AdminPipe,
    LoteBloqueadoPipe,
    ViewQRComponent,
    GenerateConvenioComponent,
    AbmConvenioComponent,
    DeleteLoteComponent,
    GenerateVinculacionComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    MaterialModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    QRCodeModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
