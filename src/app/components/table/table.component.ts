import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActionButton } from 'src/app/models/actionButton';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {

  @Input() showPaginator!: boolean;
  @Input() dataSource!: MatTableDataSource<any>;
  @Input() columnas!: string[];
  @Input() actionButtons!: ActionButton[];

  @Output() actionOne = new EventEmitter<any>();
  @Output() actionTwo = new EventEmitter<any>();
  @Output() actionThree = new EventEmitter<any>();
  @Output() chipAction = new EventEmitter<any>();
  @Output() actionFour = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor() { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
  }

  getColumnInfo(element: any, column: any): string {
    return typeof element[column] === 'object' ? element[column][column] : element[column];
  }

  actionCaller(actionIndex: any, payload: any): void {
    switch (actionIndex) {
      case 1: {
        this.actionOne.emit(payload);
        break;
      }
      case 2: {
        this.actionTwo.emit(payload);
        break;
      }
      case 3: {
        this.actionThree.emit(payload);
        break;
      }
      case 4: {
        this.actionFour.emit(payload);
      }
    }
  }

  chipClick(payload: any): void {
    this.chipAction.emit(payload);
  }
}
