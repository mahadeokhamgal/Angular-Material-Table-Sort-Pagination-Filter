
// import { MatTableDataSource } from '@angular/material/table';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { SelectionModel } from '@angular/cdk/collections';
// import { ResizeEvent } from 'angular-resizable-element';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { Component, Inject, ViewChild, ElementRef, Renderer2, OnInit,TemplateRef } from '@angular/core';
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';




// @Component({
//   selector: 'app-mat4',
//   templateUrl: './mat4.component.html',
//   styleUrls: ['./mat4.component.css']
// })
// export class Mat4Component implements OnInit{
//   public searchForm: FormGroup;
//   displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol', 'action'];
//   filterTypes: object = 
//   {
//     "position" : ["greater", "lesser"],
//     "name" : ["includes", "starts", "ends", "does not contain", ""],
//     "weight":["greater", "lesser"],
//     "symbol":["includes", "starts", "ends", ""]
//   };
//   public iconVal:boolean=false;
//   public nameFilterType = this.filterTypes["name"][0];
//   public symbolFilterType = this.filterTypes["symbol"][0];
//   public weightFilterType = this.filterTypes["weight"][0];
//   public positionFilterType = this.filterTypes["position"][0];
  
  
//   dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
//   selection = new SelectionModel<PeriodicElement>(true, []);
//   @ViewChild('icon') iconElement: ElementRef;

//   animal: string;
//   name: string;
 
//   @ViewChild('callAPIDialog1') callAPIDialog1: TemplateRef<any>;
//   @ViewChild('callAPIDialog2') callAPIDialog2: TemplateRef<any>;
 
//   @ViewChild('callAPIDialog3') callAPIDialog3: TemplateRef<any>;
//   @ViewChild('callAPIDialog4') callAPIDialog4: TemplateRef<any>;
//   @ViewChild(MatSort, { static: true }) sort: MatSort;
//   @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

//   constructor(public dialog: MatDialog, private renderer: Renderer2) { }
//   ngOnInit() {
//     this.dataSource.sort = this.sort;
//     this.dataSource.paginator = this.paginator;
//     this.searchFormInit();
//     this.dataSource.filterPredicate = this.getFilterPredicate();

   
//   }
//   changeIconVal(){
//     this.iconVal=true;
//     console.log(this.iconVal);
//   }
//   callAPI1({ pageX, pageY, currentTarget }: MouseEvent):void {
//     const { height, width, top, left } = (currentTarget as HTMLElement).getBoundingClientRect();
//     console.log((currentTarget as HTMLElement).getBoundingClientRect());
//     const dialogRef = this.dialog.open(this.callAPIDialog1,{
      
//         width: '350px',
//         height:'300px',
//         data: { name: this.name},
//         // hasBackdrop: false,
//         position: {
//           // left: `${pageX}px`, top: `${pageY}px`
//           left: `${left + width / 2}px`, top: `${top + height}px`
//         }
//       }
//     );
//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed');
   
//       this.renderer.removeClass(this.iconElement.nativeElement, 'icon-remove');
//     });
//   }
//   callAPI2({ pageX, pageY, currentTarget }: MouseEvent):void {
//     const { height, width, top, left } = (currentTarget as HTMLElement).getBoundingClientRect();
//     console.log((currentTarget as HTMLElement).getBoundingClientRect());
//     const dialogRef = this.dialog.open(this.callAPIDialog2,{
      
//         width: '350px',
//         height:'200px',
//         data: { name: this.name},
//         // hasBackdrop: false,
//         position: {
//           // left: `${pageX}px`, top: `${pageY}px`
//           left: `${left + width / 2}px`, top: `${top + height}px`
//         }
//       }
//     );
//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed');
   
//       this.renderer.removeClass(this.iconElement.nativeElement, 'icon-remove');
//     });
//   }
//   callAPI3({ pageX, pageY, currentTarget }: MouseEvent):void {
//     const { height, width, top, left } = (currentTarget as HTMLElement).getBoundingClientRect();
//     console.log((currentTarget as HTMLElement).getBoundingClientRect());
//     const dialogRef = this.dialog.open(this.callAPIDialog3,{
      
//         width: '350px',
//         height:'200px',
//         data: { name: this.name},
//         // hasBackdrop: false,
//         position: {
//           // left: `${pageX}px`, top: `${pageY}px`
//           left: `${left + width / 2}px`, top: `${top + height}px`
//         }
//       }
//     );
//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed');
   
//       this.renderer.removeClass(this.iconElement.nativeElement, 'icon-remove');
//     });
//   }
//   callAPI4({ pageX, pageY, currentTarget }: MouseEvent):void {
//     const { height, width, top, left } = (currentTarget as HTMLElement).getBoundingClientRect();
//     console.log((currentTarget as HTMLElement).getBoundingClientRect());
//     const dialogRef = this.dialog.open(this.callAPIDialog4,{
      
//         width: '350px',
//         height:'200px',
//         data: { name: this.name},
//         // hasBackdrop: false,
//         position: {
//           // left: `${pageX}px`, top: `${pageY}px`
//           left: `${left + width / 2}px`, top: `${top + height}px`
//         }
//       }
//     );
//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed');
   
//       this.renderer.removeClass(this.iconElement.nativeElement, 'icon-remove');
//     });
//   }
//   onFilter():void{

//   }
//   onCancel(): void { 
//     this.dialog.closeAll(); 
//   } 
//   isAllSelected() {
//     return this.selection.selected.length === this.dataSource.data.length;
//   }

//   masterToggle() {
//     this.isAllSelected()
//       ? this.selection.clear()
//       : this.dataSource.data.forEach((row) => this.selection.select(row));
//   }
  
//   // openDialog({ pageX, pageY, currentTarget }: MouseEvent): void {
  
//   //   console.log((currentTarget as HTMLElement).getBoundingClientRect());
//   //   const dialogRef = this.dialog.open(ExampleDialogComponentComponent, {
//   //     width: '350px',
//   //     data: { name: this.name, positionFilterType: this.positionFilterType },
//   //     // hasBackdrop: false,
//   //     position: {
//   //       // left: `${pageX}px`, top: `${pageY}px`
//   //       left: `${left + width / 2}px`, top: `${top + height}px`
//   //     }
//   //   }
//   //   );

//   //   dialogRef.afterClosed().subscribe(result => {
//   //     console.log('The dialog was closed');
   
//   //     this.renderer.removeClass(this.iconElement.nativeElement, 'icon-remove');
//   //   });

//   //   console.log(this.iconElement);
//   //   // console.log(this.matIcon);
//   //   // this.matIcon.color = 'accent';
//   //   this.renderer.addClass(this.iconElement.nativeElement, 'icon-remove');
//   // }



//   onResizeEnd(event: ResizeEvent, columnName): void {
//     if (event.edges.right) {
//       const cssValue = event.rectangle.width + 'px';
//       const columnElts = document.getElementsByClassName(
//         'mat-column-' + columnName
//       );
//       for (let i = 0; i < columnElts.length; i++) {
//         const currentEl = columnElts[i] as HTMLDivElement;
//         currentEl.style.width = cssValue;
//       }
//     }
//   }
//   searchFormInit() {
//     this.searchForm = new FormGroup({
//       position: new FormControl(0),
//       name: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
//       weight: new FormControl(0),
//       symbol: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
//     });
//   }
//   getTypeVal(colVal, inVal, filterType): boolean {
//     console.log("gettype val", colVal, inVal, filterType);
//     if(inVal===""|| inVal===0 || inVal===null)
//       return true;
    
//     switch (filterType) {
//       case "": return true;
//       case "includes":  return colVal.toLowerCase().includes(inVal);
//       case "starts": return colVal.toLowerCase().startsWith(inVal);
//       case "ends": return colVal.toLowerCase().endsWith(inVal);
//       case "does not contain": return !colVal.toLowerCase().includes(inVal);
//       case "greater": return parseFloat(colVal) > parseFloat(inVal);
//       case "lesser": return parseFloat(colVal) < parseFloat(inVal);
//     }
//     return true;
//   }
//   getFilterPredicate() {
//     return (row: PeriodicElement, filters: string) => {
//       const filterArray = filters.split('$');
      
//       return this.getTypeVal(row.position, filterArray[0], this.positionFilterType)
//         && this.getTypeVal(row.name, filterArray[1], this.nameFilterType)
//         && this.getTypeVal(row.weight, filterArray[2], this.weightFilterType)
//         && this.getTypeVal(row.symbol, filterArray[3], this.symbolFilterType);
//     };
//   }
//   applyFilter() {
//     var position = this.searchForm.get('position').value;
//     var name = this.searchForm.get('name').value;
//     var weight = this.searchForm.get('weight').value;
//     var symbol = this.searchForm.get('symbol').value;
    
//     position = position === null ? '' : position;
//     name = name === null ? '' : name;
//     weight = weight === null ? '' : weight;
//     symbol = symbol === null ? '' : symbol;

//     this.dataSource.filter = (position + "$" + name + '$' + weight + "$" + symbol).trim().toLowerCase();
//   }

//   selectedRow;
// }

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }
// const Quote_Data:any=
// {
//   "quoteId": 64837,
//   "name": "mkhamgal - Untitled",
//   "status": null,
//   "cfu": "OB",
//   "totalUpfront": "0",
//   "totalMonthly": "0",
//   "createdBy": "P4002578",
//   "createdDate": "2023-10-20T22:31:39",
//   "updatedBy": "P4002578",
//   "updatedDate": "2023-10-20T22:31:58",
//   "createdByUser": "Mahadeo Khamgal",
//   "updatedByUser": "Mahadeo Khamgal",
//   "customer": {
//       "uid": "43884",
//       "name": "BRT Customer - Test"
//   },
//   "opportunity": {
//       "opportunityId": "1-TEST12"
//   },
//   "contract": {
//       "agreementType": "NEW",
//       "agreementId": null,
//       "agreementStatus": "Quote Created"
//   },
//   "avgArpu": null,
//   "avgEarpu": null,
//   "productId": null,
//   "version": "1.5000000000000004",
//   "approvalSummary": null
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
//   { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
//   { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
//   { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
//   { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
//   { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
//   { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
//   { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
//   { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
//   { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
//   { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
// ];


import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { ResizeEvent } from 'angular-resizable-element';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject, ViewChild, ElementRef, Renderer2, OnInit,TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mat4',
  templateUrl: './mat4.component.html',
  styleUrls: ['./mat4.component.css']
})
export class Mat4Component implements OnInit {
  public searchForm: FormGroup;
  public name:string;
 filterTypes: object = 
  {
    'quotetype' : ["Contains","Starts With","Ends With","Does not contain"],
    'quoteid' : ["Is equal to"],
    'name':["Contains","Starts With","Ends With","Does not contain"],
    'cfu':["Contains","Starts With","Ends With","Does not contain"],
    'custname':["Contains","Starts With","Ends With","Does not contain"],
    'opportunity_id':["Contains","Starts With","Ends With","Does not contain"],
    'status':["Contains","Starts With","Ends With","Does not contain"]

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
  public page_size_options:Number[]=[5,10,15,16];
  public quoteTypeFilterOption = this.filterTypes['quotetype'][0];
  public quoteidFilterOption = this.filterTypes['quoteid'][0];
  public quotenameFilterOption= this.filterTypes['name'][0];
  public cfuFilterOption = this.filterTypes['cfu'][0];
  public custnameFilterOption = this.filterTypes['custname'][0];
  public opportunity_idFilterOption = this.filterTypes['opportunity_id'][0];
  public statusFilterOption = this.filterTypes['status'][0];


  dataSource = new MatTableDataSource<any>(QUOTE_DATA);
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
  
  
  constructor(public dialog: MatDialog, private renderer: Renderer2) { }
  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.searchFormInit();
    this.dataSource.filterPredicate = this.getFilterPredicate();
  }
  
  getSpecificDialogue(type : string) {
    switch(type) {
      case "quotetype" : return this.callAPIDialog1;
      case "quoteid" : return this.callAPIDialog2;
      case "name" : return this.callAPIDialog3;
      case "cfu" : return this.callAPIDialog4;
      case "custname" : return this.callAPIDialog5;
      case "opportunity_id" : return this.callAPIDialog6;
      case "status" : return this.callAPIDialog7;
    }
    return this.callAPIDialog1;
  }
  callAPI({ pageX, pageY, currentTarget }: MouseEvent, coltype:string) : void {
    const { height, width, top, left } = (currentTarget as HTMLElement).getBoundingClientRect();
    console.log((currentTarget as HTMLElement).getBoundingClientRect());
    const dialogRef = this.dialog.open(this.getSpecificDialogue(coltype),{
      
        width: '350px',
        height:'300px',
        data: { name: this.name},
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
      custname:new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      opportunity_id: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      status:new FormControl('', Validators.pattern('^[a-zA-Z ]+$'))
    });
  }
  getTypeVal(colVal, inVal, filterType): boolean {
    console.log("gettype val", colVal, inVal, filterType);
    if(inVal===""|| inVal===0 || inVal===null)
      return true;
  
    switch (filterType) {
      case "": return true;
      case "Contains":  return colVal.toLowerCase().includes(inVal);
      case "Starts With": return colVal.toLowerCase().startsWith(inVal);
      case "Ends With": return colVal.toLowerCase().endsWith(inVal);
      // case "Is equal to": {console.log("i was matched in the case you mentioned");
      // console.log("i am the value of ternary", (typeof(colVal) === "string") && (typeof(inVal) === "string"), typeof(colVal));
      // 
      //  return ((typeof(colVal) === "string") && (typeof(inVal) === "string")) ? colVal.toLowerCase() === inVal.toLowerCase() : parseFloat(colVal) === parseFloat(inVal);}
      case "Does not contain ": return !colVal.toLowerCase().includes(inVal);

    }
    return true;
  }
  getFilterPredicate() {
    return (row: any, filters: string) => {
      const filterArray = filters.split('$');

      return this.getTypeVal(row.contract.agreementType, filterArray[0], this. quoteTypeFilterOption)
        && this.getTypeVal(row.quoteId, filterArray[1], this.quoteidFilterOption)
        && this.getTypeVal(row.name, filterArray[2], this.quotenameFilterOption)
        && this.getTypeVal(row.cfu, filterArray[3], this.cfuFilterOption)
        &&this.getTypeVal(row.customer.name, filterArray[4], this.custnameFilterOption)
        && this.getTypeVal(row.opportunity.opportunityId,filterArray[5], this.opportunity_idFilterOption)
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
    status=status===null ? '':status;
    
    this.dataSource.filter = (quotetype + "$" + quoteid + '$' + name + "$" + cfu + "$" + custname + '$' + opportunity_id + "$" + status).trim().toLowerCase();
  }
  selectedRow;
}

const QUOTE_DATA:any[] = [
  {
      "quoteId": 64050,
      "name": "mhundekar - Untitled",
      "status": "null",
      "cfu": "OB",
      "totalUpfront": "0",
      "totalMonthly": "0",
      "createdBy": "p4003712",
      "createdDate": "2023-10-16T15:53:25",
      "updatedBy": "p4003712",
      "updatedDate": "2023-10-16T15:53:25",
      "createdByUser": "Mohammed Hundekar",
      "updatedByUser": "Mohammed Hundekar",
      "customer": {
          "uid": "43884",
          "name": "BRT Customer - Victoria"
      },
      "opportunity": {
          "opportunityId": "1-7N0R11"
      },
      "contract": {
          "agreementType": "NEW",
          "agreementId": null,
          "agreementStatus": "Quote Created"
      },
      "avgArpu": null,
      "avgEarpu": null,
      "productId": null,
      "version": "1",
      "approvalSummary": null
  }
];




