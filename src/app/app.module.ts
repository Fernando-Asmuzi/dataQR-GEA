import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './layout/home/home.component';
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
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
    GenerateDisenoComponent
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
    QRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
