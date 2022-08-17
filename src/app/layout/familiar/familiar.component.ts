import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FamiliaresService } from 'src/app/services/familiares.service';
import { Familiar } from 'src/app/models/familiar';
import { MatDialog } from '@angular/material/dialog';
import { FamiliarFormComponent } from '../familiar-form/familiar-form.component';

@Component({
  selector: 'app-familiar',
  templateUrl: './familiar.component.html',
  styleUrls: ['./familiar.component.scss']
})
export class FamiliarComponent implements OnInit {

  id: String | null = '';
  familiares: Array<Familiar> = [];
  

  constructor(public dialog: MatDialog, private router: Router, private route: ActivatedRoute, private familiaresService: FamiliaresService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.familiaresService.getFamiliares(Number(this.id)).subscribe(response =>{
       this.familiares = response  
    })     
  }

  openDialog(){
    this.dialog.open(FamiliarFormComponent, {
      width: '600px',
      data:"rigth click"
    })
  }
 
}
