import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() showPaginator!: boolean;
  @Input() dataSource!: MatTableDataSource<any>;
  @Input() columnas!: string[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor() { }

  ngOnInit(): void {
  }

  getColumnInfo(element: any, column: any): string {
    return typeof element[column] === 'object' ? element[column][column] : element[column];
  }

}
