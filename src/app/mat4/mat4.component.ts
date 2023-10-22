import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { ResizeEvent } from 'angular-resizable-element';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-mat4',
  templateUrl: './mat4.component.html',
  styleUrls: ['./mat4.component.css']
})
export class Mat4Component implements OnInit {
  public searchForm: FormGroup;
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol', 'action'];
  filterTypes: object = {"position" : ["greater", "lesser"], "name" : ["includes", "starts", "ends", "does not contain", ""], "symbol":["includes", "starts", "ends", ""]};

  public nameFilterType = this.filterTypes["name"][0];
  public symbolFilterType = this.filterTypes["symbol"][0];
  public positionFilterType = this.filterTypes["position"][0];
  
  
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.searchFormInit();
    this.dataSource.filterPredicate = this.getFilterPredicate();
  }

  isAllSelected() {
    return this.selection.selected.length === this.dataSource.data.length;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  onResizeEnd(event: ResizeEvent, columnName): void {
    if (event.edges.right) {
      const cssValue = event.rectangle.width + 'px';
      const columnElts = document.getElementsByClassName(
        'mat-column-' + columnName
      );
      for (let i = 0; i < columnElts.length; i++) {
        const currentEl = columnElts[i] as HTMLDivElement;
        currentEl.style.width = cssValue;
      }
    }
  }
  searchFormInit() {
    this.searchForm = new FormGroup({
      position: new FormControl(0),
      name: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      symbol: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
    });
  }
  getTypeVal(colVal, inVal, filterType): boolean {
    console.log("gettype val", colVal, inVal, filterType);
    
    switch (filterType) {
      case "": return true;
      case "includes":  return colVal.toLowerCase().includes(inVal);
      case "starts": return colVal.toLowerCase().startsWith(inVal);
      case "ends": return colVal.toLowerCase().endsWith(inVal);
      case "does not contain": return inVal == "" ? true : !colVal.toLowerCase().includes(inVal);
      case "greater": return parseInt(colVal) > parseInt(inVal);
      case "lesser": return parseInt(colVal) < parseInt(inVal);
    }
    return true;
  }
  getFilterPredicate() {
    return (row: PeriodicElement, filters: string) => {
      const filterArray = filters.split('$');
      
      return this.getTypeVal(row.position, filterArray[0], this.positionFilterType)
        && this.getTypeVal(row.name, filterArray[1], this.nameFilterType)
        && this.getTypeVal(row.symbol, filterArray[2], this.symbolFilterType);
    };
  }
  applyFilter() {
    var position = this.searchForm.get('position').value;
    var name = this.searchForm.get('name').value;
    var symbol = this.searchForm.get('symbol').value;
    
    position === null ? '' : position;
    name === null ? '' : name;
    symbol === null ? '' : symbol;

    this.dataSource.filter = (position + "$" + name + '$' + symbol).trim().toLowerCase();
  }
  applyType(col, type) {
    switch(col) {
      case "name" : this.nameFilterType = type;
      break;
      case "symbol" : this.symbolFilterType = type;
      break;
      case "position" : this.positionFilterType = type;
    }
  }
  selectedRow;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];
