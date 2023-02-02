import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FamiliaresService } from 'src/app/services/familiares.service';
import { Familiar } from 'src/app/models/familiar';
import { MatDialog } from '@angular/material/dialog';
import { FamiliarFormComponent } from '../familiar-form/familiar-form.component';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from '../../components/abstract/base.component';
import { finalize, Subscription } from 'rxjs';
import { DocumentoFormComponent } from '../documento-form/documento-form.component';
import { MascotaFormComponent } from '../mascota-form/mascota-form.component';
import { DocumentosService } from 'src/app/services/documentos.service';
import { environment } from 'src/environments/environment';
import { DialogComponent } from 'src/app/components/admin/dialog/dialog.component';

@Component({
  selector: 'app-familiar',
  templateUrl: './familiar.component.html',
  styleUrls: ['./familiar.component.scss']
})
export class FamiliarComponent extends BaseComponent implements OnInit, OnDestroy {

  id: String | null = '';
  familiares: Array<Familiar> = [];
  
  showSpinner: boolean = true;

  documentosSubscription!: Subscription;

  constructor(
    public override dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private familiaresService: FamiliaresService,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private documentosService: DocumentosService
    ) { super(dialog); }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ? this.route.snapshot.paramMap.get('id') : this.usuarioService.getUserLogin()?.id;
    this.getFamiliares();
  }

  ngOnDestroy(): void {
    this.documentosSubscription && this.documentosSubscription.unsubscribe();
  }

  getFamiliares(){
    this.familiaresService.getFamiliares(Number(this.id)).pipe(
      finalize(
        () => this.showSpinner = false
      ),
    ).subscribe(response =>{
      this.familiares = response  
   })  
  }

  openDialog(){
    this.dialog.open(FamiliarFormComponent, {
      width: '600px'
    }).afterClosed().subscribe(resp => {
      if(resp == true){
        this.viewMessageAndReload('agregado');
      } else {
        this.snackBar.open(`Ocurrió un error al agregar usuario, intente nuevamente.`, 'Aceptar', {duration: 1500})
      }
    })
  }

  editFamiliar(familiar: Familiar){
    const component: any = familiar.especie ? MascotaFormComponent : FamiliarFormComponent;
     this.dialog.open(component,{
       data: familiar
     }).afterClosed().subscribe(resp => {
      if(resp){
        this.viewMessageAndReload('modificado');
      }
    })
  }


  deleteFamiliar(familiar: any){
    this.showBasicDialog('Atención', 'Va a borrar un diseño, confirme eliminación').afterClosed().subscribe(
      resp => {
        if (resp) {
          this.familiaresService.deleteFamiliar(familiar).subscribe(
            response => {
              if(response){
                this.viewMessageAndReload('eliminado');
              }
            }
          )
        }
      }
    )
  }

  viewMessageAndReload(message: string): void {
    this.snackBar.open(`Usuario ${message} correctamente`, 'Aceptar', {duration: 1500})
    this.getFamiliares();
  }

  addDocument(f: any): void {
    this.dialog.open(DocumentoFormComponent, {
      data: f
    }).afterClosed().subscribe(resp => {
      console.log(resp);
    })
  }

  openDocument(documento: any): void {
    const splitted = documento.documento.slice(1);
    const link = environment.url_documentos + splitted;
    window.open(link);
  }

  deleteDocument(documento: any): void {
    this.dialog.open(DialogComponent, {
      data: {
        title: 'Eliminar Documento',
        content: `Está por eliminar el documento: ${documento.nombre}. Confirme eliminación.`
      }
    }).afterClosed().subscribe(response => {
      if(response){
        this.documentosSubscription = this.documentosService.deleteDocumento(documento.id).subscribe(
          resp => {
            if(resp){
              this.snackBar.open(`Documento eliminado correctamente.`, 'Aceptar', {duration: 1500})
              this.getFamiliares();
            } else {
              this.snackBar.open(`Ocurrió un error al agregar usuario, intente nuevamente.`, 'Aceptar', {duration: 1500})
            }
          }
        )
      } else {
        this.dialog.closeAll();
      }
    })
  }

}
