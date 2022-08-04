import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccessComponent } from './components/admin/access/access.component';
import { AbmLotesComponent } from './components/admin/abm-lotes/abm-lotes.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DetalleLoteComponent } from './components/admin/detalle-lote/detalle-lote.component';
import { TableComponent } from './components/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EstadoLotePipe } from './pipes/estado-lote.pipe';
import { QrsComponent } from './components/admin/qrs/qrs.component';
import { QRCodeModule } from 'angularx-qrcode';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OnCreateDirective } from './directives/on-create.directive';


@NgModule({
  declarations: [
    AppComponent,
    AccessComponent,
    AbmLotesComponent,
    DetalleLoteComponent,
    QrsComponent,
    TableComponent,
    EstadoLotePipe,
    OnCreateDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    QRCodeModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
