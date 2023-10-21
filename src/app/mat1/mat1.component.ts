import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { ResizeEvent } from 'angular-resizable-element';
import { FormGroup , FormControl, Validators} from '@angular/forms';
import { Voyage } from '../shared/entities.service';

@Component({
  selector: 'app-mat1',
  templateUrl: './mat1.component.html',
  styleUrls: ['./mat1.component.css']
})
export class Mat1Component implements OnInit {
  public searchForm: FormGroup;
  // public departureDate = '';
  public name = '';
  public symbol = '';
  displayedColumns: string[] = [
    'select',
    'position',
    'name',
    'weight',
    'symbol',
    'action',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  // constructor()
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.searchFormInit();
    /* Filter predicate used for filtering table per different columns
    *  */
    this.dataSource.filterPredicate = this.getFilterPredicate();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
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
      name: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      symbol: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
    });
  }
  getFilterPredicate() {
    return (row: PeriodicElement, filters: string) => {
      console.log("the row is", row);
      
      // split string per '$' to array
      const filterArray = filters.split('$');
      const name = filterArray[0];
      const symbol = filterArray[1];
      // const arrivalStation = filterArray[2];

      const matchFilter = [];

      // Fetch data from row
      const columnName = row.name;
      const columnSymbol = row.symbol;
      // const columnArrivalStation = row.route.arrivalStation.name;

      // verify fetching data by our searching values
      // const customFilterDD = columnDepartureDate.toDateString().toLowerCase().includes(departureDate);
      const customFilterName = columnName.toLowerCase().includes(name);
      const customFilterSymbol = columnSymbol.toLowerCase().includes(symbol);

      // push boolean values into array
      // matchFilter.push(customFilterDD);
      matchFilter.push(customFilterName);
      matchFilter.push(customFilterSymbol);

      // return true if all values in array is true
      // else return false
      return matchFilter.every(Boolean);
    };
  }
  applyFilter() {
    const ds = this.searchForm.get('name').value;
    const as = this.searchForm.get('symbol').value;
    // const ds = this.searchForm.get('departureStation').value;

    // this.departureDate = (date === null || date === '') ? '' : date.toDateString();
    this.name = ds === null ? '' : ds;
    this.symbol = as === null ? '' : as;

    // // create string of our searching values and split if by '$'
    const filterValue = this.name + '$' + this.symbol;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
