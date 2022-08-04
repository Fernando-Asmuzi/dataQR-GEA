import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LotesService } from 'src/app/services/lotes.service';

@Component({
  selector: 'app-qrs',
  templateUrl: './qrs.component.html',
  styleUrls: ['./qrs.component.scss']
})
export class QrsComponent implements OnInit {

  lotes: any;

  sizes = [
    {
      value: 171,
      viewValue: "1,5x1,5 cm"
    },
    {
      value: 295,
      viewValue: "2,5x2,5 cm"
    },
    {
      value: 591,
      viewValue: "5x5 cm"
    },
  ];

  ancho!: number;

  sizeControl = new FormControl(this.sizes[0], Validators.required);

  constructor(
    private lotesService: LotesService,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(
      (resp: any) => {
        this.lotesService.getLoteByCod(resp.codigo).subscribe(
          response => {
            this.lotes = response;
          }
        )
      }
    )
  }

}
