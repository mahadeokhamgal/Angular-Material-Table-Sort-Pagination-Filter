import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { ResizeEvent } from 'angular-resizable-element';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject, ViewChild, ElementRef, Renderer2, OnInit, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuoteListService } from './quote-list.service';

@Component({
  selector: 'app-mat4',
  templateUrl: './mat4.component.html',
  styleUrls: ['./mat4.component.css']
})
export class Mat4Component implements OnInit {
  public searchForm: FormGroup;
  public name: string;
  filterTypes: object =
    {
      'quotetype': ["Contains", "Is equal to", "Starts With", "Ends With", "Does not contain"],
      'quoteid': ["Is equal to"],
      'name': ["Contains", "Is equal to", "Starts With", "Ends With", "Does not contain"],
      'cfu': ["Contains", "Is equal to", "Starts With", "Ends With", "Does not contain"],
      'custname': ["Contains", "Is equal to", "Starts With", "Ends With", "Does not contain"],
      'opportunity_id': ["Contains", "Is equal to", "Starts With", "Ends With", "Does not contain"],
      'status': ["Contains", "Is equal to", "Starts With", "Ends With", "Does not contain"]
    };


  displayedColumns: string[] = [
    'quotetype',
    'quoteid',
    'name',
    'cfu',
    'custname',
    'opportunity_id',
    'status',
    'install',
    'monthly',
    'createdDate',
    'updatedDate'
  ];
  public page_size_options: Number[] = [5, 10, 15, 16];
  public quoteTypeFilterOption = this.filterTypes['quotetype'][0];
  public quoteidFilterOption = this.filterTypes['quoteid'][0];
  public quotenameFilterOption = this.filterTypes['name'][0];
  public cfuFilterOption = this.filterTypes['cfu'][0];
  public custnameFilterOption = this.filterTypes['custname'][0];
  public opportunity_idFilterOption = this.filterTypes['opportunity_id'][0];
  public statusFilterOption = this.filterTypes['status'][0];


  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('icon') iconElement: ElementRef;
  @ViewChild('callAPIDialog1') callAPIDialog1: TemplateRef<any>;
  @ViewChild('callAPIDialog2') callAPIDialog2: TemplateRef<any>;

  @ViewChild('callAPIDialog3') callAPIDialog3: TemplateRef<any>;
  @ViewChild('callAPIDialog4') callAPIDialog4: TemplateRef<any>;
  @ViewChild('callAPIDialog5') callAPIDialog5: TemplateRef<any>;
  @ViewChild('callAPIDialog6') callAPIDialog6: TemplateRef<any>;
  @ViewChild('callAPIDialog7') callAPIDialog7: TemplateRef<any>;


  constructor(public dialog: MatDialog, private renderer: Renderer2, public qlist: QuoteListService) { }
  buildGrid(data :any){
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.searchFormInit();
    this.dataSource.filterPredicate = this.getFilterPredicate();
  }
  ngOnInit() {
    this.buildGrid([]);
    this.qlist.getAllQuotes().subscribe((res: any) => {
      console.log("got the data", res);
      this.buildGrid(res);
    })
  }

  getSpecificDialogue(type: string) {
    switch (type) {
      case "quotetype": return this.callAPIDialog1;
      case "quoteid": return this.callAPIDialog2;
      case "name": return this.callAPIDialog3;
      case "cfu": return this.callAPIDialog4;
      case "custname": return this.callAPIDialog5;
      case "opportunity_id": return this.callAPIDialog6;
      case "status": return this.callAPIDialog7;
    }
    return this.callAPIDialog1;
  }
  callAPI({ pageX, pageY, currentTarget }: MouseEvent, coltype: string): void {
    const { height, width, top, left } = (currentTarget as HTMLElement).getBoundingClientRect();
    console.log((currentTarget as HTMLElement).getBoundingClientRect());
    const dialogRef = this.dialog.open(this.getSpecificDialogue(coltype), {

      width: '350px',
      height: '300px',
      data: { name: this.name },
      position: {
        left: `${left + width / 2}px`, top: `${top + height}px`
      }
    }
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.renderer.removeClass(this.iconElement.nativeElement, 'icon-remove');
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }



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
      quotetype: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      name: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      quoteid: new FormControl(0),
      cfu: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      custname: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      opportunity_id: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      status: new FormControl('', Validators.pattern('^[a-zA-Z ]+$'))
    });
  }
  getTypeVal(colVal, inVal, filterType): boolean {
    console.log("gettype val", colVal, inVal, filterType);
    if (inVal === "" || inVal === 0 || inVal === "0" || inVal === null) {
      console.log("returning true in null check", inVal);
      return true;
    }
    colVal = String(colVal);
    inVal = String(inVal);
    switch (filterType) {
      case "": return true;
      case "Contains": return colVal.toLowerCase().includes(inVal);
      case "Starts With": return colVal.toLowerCase().startsWith(inVal);
      case "Ends With": return colVal.toLowerCase().endsWith(inVal);
      case "Is equal to": return colVal.toLowerCase() == inVal.toLowerCase();
      case "Does not contain ": return !colVal.toLowerCase().includes(inVal);
    }
    return true;
  }
  getFilterPredicate() {
    return (row: any, filters: string) => {
      const filterArray = filters.split('$');

      return this.getTypeVal(row.contract.agreementType, filterArray[0], this.quoteTypeFilterOption)
        && this.getTypeVal(row.quoteId, filterArray[1], this.quoteidFilterOption)
        && this.getTypeVal(row.name, filterArray[2], this.quotenameFilterOption)
        && this.getTypeVal(row.cfu, filterArray[3], this.cfuFilterOption)
        && this.getTypeVal(row.customer.name, filterArray[4], this.custnameFilterOption)
        && this.getTypeVal(row.opportunity.opportunityId, filterArray[5], this.opportunity_idFilterOption)
        && this.getTypeVal(row.status, filterArray[6], this.statusFilterOption)

    };
  }
  onCancel(): void {
    this.dialog.closeAll();
  }

  applyFilter() {
    var quotetype = this.searchForm.get('quotetype').value;
    var quoteid = this.searchForm.get('quoteid').value;
    var name = this.searchForm.get('name').value;
    var cfu = this.searchForm.get('cfu').value;
    var custname = this.searchForm.get('custname').value;
    var opportunity_id = this.searchForm.get('opportunity_id').value;
    var status = this.searchForm.get('status').value;


    quotetype = quotetype === null ? '' : quotetype;
    quoteid = quoteid === null ? '' : quoteid;
    name = name === null ? '' : name;
    cfu = cfu === null ? '' : cfu;
    custname = custname === null ? '' : custname;
    opportunity_id = opportunity_id === null ? '' : opportunity_id;
    status = status === null ? '' : status;

    this.dataSource.filter = (quotetype + "$" + quoteid + '$' + name + "$" + cfu + "$" + custname + '$' + opportunity_id + "$" + status).trim().toLowerCase();
  }
  selectedRow;
}




