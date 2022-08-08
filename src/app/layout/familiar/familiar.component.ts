import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FamiliaresService } from 'src/app/services/familiares.service';
import { Familiar } from 'src/app/models/familiar';


@Component({
  selector: 'app-familiar',
  templateUrl: './familiar.component.html',
  styleUrls: ['./familiar.component.scss']
})
export class FamiliarComponent implements OnInit {

  id: String | null = '';
  familiares: Array<Familiar> = [];

  constructor(private router: Router, private route: ActivatedRoute, private familiaresService: FamiliaresService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);

   /*  this.familiaresService.getFamiliares(Number(this.id)).subscribe(response =>{
       this.familiares = response  
  })  */
    console.log(this.familiares)
  }
}
