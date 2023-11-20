
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { ResizeEvent } from 'angular-resizable-element';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject, ViewChild, ElementRef, Renderer2, OnInit, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuoteListService } from './quote-list.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mat4',
  templateUrl: './mat4.component.html',
  styleUrls: ['./mat4.component.css']
})
export class Mat4Component implements OnInit {
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  public searchForm: FormGroup;
  public DatePickerForm: FormGroup;
  public quoteIdPickerForm: FormGroup;
  public opportunityIdPickerForm:FormGroup;
  public name: string;
  public title: string;
  public loadingQuoteList: boolean = true;
  public dataLoaded = false;
  closeResult = '';
  public selectedTabValue: string = 'Date';
  public from_date: Date = new Date();
  public to_date: Date = new Date();
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
  public modalref:any;


  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('icon') iconElement: ElementRef;
  @ViewChild('allpopuptemplate') allpopuptemplate: TemplateRef<any>;
  @ViewChild('callAPIDialog1') callAPIDialog1: TemplateRef<any>;
  @ViewChild('callAPIDialog2') callAPIDialog2: TemplateRef<any>;

  @ViewChild('callAPIDialog3') callAPIDialog3: TemplateRef<any>;
  @ViewChild('callAPIDialog4') callAPIDialog4: TemplateRef<any>;
  @ViewChild('callAPIDialog5') callAPIDialog5: TemplateRef<any>;
  @ViewChild('callAPIDialog6') callAPIDialog6: TemplateRef<any>;
  @ViewChild('callAPIDialog7') callAPIDialog7: TemplateRef<any>;


  constructor(public dialog: MatDialog, private renderer: Renderer2, public qlist: QuoteListService, private modalService: NgbModal) {

  }
  onTableDataChange(event: any) {
    this.page = event;
    //this.fetchPosts();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
   // this.fetchPosts();
  }
  buildGrid(data: any) {
    console.log("buildgrid called");
    
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.searchFormInit();
    this.dataSource.filterPredicate = this.getFilterPredicate();
    this.dataLoaded = true;
  }
  selectedTab(tabName: string) {
    this.selectedTabValue = tabName;
  }

  open(content) {
    console.log("dialog open");
    this.modalref=this.modalService.open(content, { ariaLabelledBy: 'search-modal-body' });
    this.modalref.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  modalclose(){
    this.modalref.close();
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  refreshMethod() {
    this.dataLoaded = false;
    if (window.location.href.includes("mat4/mine")) {
      this.qlist.getMyQuotes().subscribe((res: any) => {
        this.buildGrid(res);

      })
    } else if (window.location.href.includes("mat4/all")) {
      this.qlist.getAllQuotes().subscribe((res: any) => {
        this.buildGrid(res);
      })
    }
  }
  ngOnInit() {
    
    if (window.location.href.includes("mat4/mine")) {
      this.title = "My Quotes";
    }
    else if (window.location.href.includes("mat4/all")) {
      this.title = "All Quotes";
    }
    
    console.log("oninit called", window.location.pathname);
    this.dataLoaded = false;
    this.buildGrid([]);
    this.dataLoaded = false;
    if (window.location.href.includes("mat4/mine")) {
      this.qlist.getMyQuotes().subscribe((res: any) => {
        console.log("got the data for mine", res);

        this.buildGrid(res);

      })
    } else if (window.location.href.includes("mat4/all")) {
      this.qlist.getAllQuotes().subscribe((res: any) => {
        console.log("got the data for all", res);
        this.buildGrid(res);
      })
    }
  }

  // refreshQuoteList() {
  //   if (this.title === "All Quotes") {
  //     this.qlist.getAllQuotes().subscribe((res: any) => {
  //       console.log("got the data for all", res);
  //       this.buildGrid(res);
  //     })
  //   }
  //   else if (this.title === "My Quotes") {
  //     this.qlist.getMyQuotes().subscribe((res: any) => {
  //       console.log("got the data for mine", res);

  //       this.buildGrid(res);

  //     })
  //   }
  // }
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
  calltemp({ pageX, pageY, currentTarget }: MouseEvent): void {
    const { height, width, top, left } = (currentTarget as HTMLElement).getBoundingClientRect();
    console.log((currentTarget as HTMLElement).getBoundingClientRect());
    const dialogRef = this.dialog.open(this.allpopuptemplate, {

      width: '350px',
      height: '300px',
      data: { name: this.name },
      backdropClass: 'bdrop',
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
  callAPI({ pageX, pageY, currentTarget }: MouseEvent, coltype: string): void {
    console.log("callapi called");
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
    console.log("searchforminit called");
    this.searchForm = new FormGroup({
      quotetype: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      name: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      quoteid: new FormControl(0),
      cfu: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      custname: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      opportunity_id: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      status: new FormControl('', Validators.pattern('^[a-zA-Z ]+$'))
    });
    // this.DatePickerForm=new FormGroup({
    //   from_Date:new FormControl('',)
    // })
    this.quoteIdPickerForm = new FormGroup({
      quote_id: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"),Validators.minLength(4),Validators.maxLength(5)])
    });
    this.opportunityIdPickerForm=new FormGroup({
      opportunity_id:new FormControl('',[Validators.required])
    });
  }
  onKeyUp(event)
  {
    console.log("quote id picker form obj",this.quoteIdPickerForm);
    console.log("event console log",event);
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
      if(!this.quoteIdPickerForm.controls.quote_id.errors)
      {
        //this.quoteIdPickerForm.controls.quote_id={errors:[{pattern:true}]};
      }
      this.quoteIdPickerForm.controls.quote_id.errors.pattern=true;
    }
    
  }
  change(event)
  {
    console.log("event on change",event);
    event.preventDefault();
  }
  onSubmit(QuotePickerForm:FormGroup) {
    // this.searchFormInit();
    console.log(QuotePickerForm);
    console.log(QuotePickerForm.valid);
    if(!QuotePickerForm.valid) return;
    else{
      console.log("onsubmit called");
    }
   
    if (this.selectedTabValue === 'Date') {

    }
    else if (this.selectedTabValue === 'Quote ID') {
      var quote_id = this.quoteIdPickerForm.get('quote_id').value;
      console.log(quote_id);
      //if(!quote_id) return;
      this.qlist.getSpecificQuoteFromQuoId(quote_id).subscribe((res: any) => {
        console.log("quote_id res",res);
        this.buildGrid(res);
      })
    }
      else if(this.selectedTabValue==='Opportunity ID')
      {
        var opportunityid = this.opportunityIdPickerForm.get('opportunity_id').value;
        this.qlist.getSpecificQuoteFromOppId(opportunityid).subscribe((res: any) => {
          console.log(res);
          this.buildGrid(res);
        })
      }
  }
  getTypeVal(colVal, inVal, filterType): boolean {
    console.log("gettype val", colVal, inVal, filterType);
    if (colVal === null) {
      console.log("returning true in null check", colVal);
      return true;
    }
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
    console.log("getfilterpredicate called");
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
    console.log("applyfilter called");
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







// import { MatTableDataSource } from '@angular/material/table';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { SelectionModel } from '@angular/cdk/collections';
// import { ResizeEvent } from 'angular-resizable-element';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { Component, Inject, ViewChild, ElementRef, Renderer2, OnInit, TemplateRef } from '@angular/core';
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { QuoteListService } from './quote-list.service';
// import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


// @Component({
//   selector: 'app-mat4',
//   templateUrl: './mat4.component.html',
//   styleUrls: ['./mat4.component.css']
// })
// export class Mat4Component implements OnInit {
//   public searchForm: FormGroup;
//   public name: string;
//   closeResult='';
//   filterTypes: object =
//     {
//       'quotetype': ["Contains", "Is equal to", "Starts With", "Ends With", "Does not contain"],
//       'quoteid': ["Is equal to"],
//       'name': ["Contains", "Is equal to", "Starts With", "Ends With", "Does not contain"],
//       'cfu': ["Contains", "Is equal to", "Starts With", "Ends With", "Does not contain"],
//       'custname': ["Contains", "Is equal to", "Starts With", "Ends With", "Does not contain"],
//       'opportunity_id': ["Contains", "Is equal to", "Starts With", "Ends With", "Does not contain"],
//       'status': ["Contains", "Is equal to", "Starts With", "Ends With", "Does not contain"]
//     };


//   displayedColumns: string[] = [
//     'quotetype',
//     'quoteid',
//     'name',
//     'cfu',
//     'custname',
//     'opportunity_id',
//     'status',
//     'install',
//     'monthly',
//     'createdDate',
//     'updatedDate'
//   ];
//   public page_size_options: Number[] = [5, 10, 15, 16];
//   public quoteTypeFilterOption = this.filterTypes['quotetype'][0];
//   public quoteidFilterOption = this.filterTypes['quoteid'][0];
//   public quotenameFilterOption = this.filterTypes['name'][0];
//   public cfuFilterOption = this.filterTypes['cfu'][0];
//   public custnameFilterOption = this.filterTypes['custname'][0];
//   public opportunity_idFilterOption = this.filterTypes['opportunity_id'][0];
//   public statusFilterOption = this.filterTypes['status'][0];
//   public dataLoaded = false;

//   dataSource = new MatTableDataSource<any>([]);
//   selection = new SelectionModel<any>(true, []);

//   @ViewChild(MatSort, { static: true }) sort: MatSort;
//   @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
//   @ViewChild('icon') iconElement: ElementRef;
//   @ViewChild('callAPIDialog1') callAPIDialog1: TemplateRef<any>;
//   @ViewChild('callAPIDialog2') callAPIDialog2: TemplateRef<any>;

//   @ViewChild('callAPIDialog3') callAPIDialog3: TemplateRef<any>;
//   @ViewChild('callAPIDialog4') callAPIDialog4: TemplateRef<any>;
//   @ViewChild('callAPIDialog5') callAPIDialog5: TemplateRef<any>;
//   @ViewChild('callAPIDialog6') callAPIDialog6: TemplateRef<any>;
//   @ViewChild('callAPIDialog7') callAPIDialog7: TemplateRef<any>;


//   constructor(private modalService: NgbModal,public dialog: MatDialog, private renderer: Renderer2, public qlist: QuoteListService) { }
//   buildGrid(data :any){
//     this.dataSource = new MatTableDataSource<any>(data);
//     this.dataSource.sort = this.sort;
//     this.dataSource.paginator = this.paginator;
//     this.searchFormInit();
//     this.dataSource.filterPredicate = this.getFilterPredicate();
//     this.dataLoaded = true;
//   }
//   ngOnInit() {
//     console.log("oninit called", window.location.pathname);
//     this.dataLoaded = false;
//     this.buildGrid([]);
//     this.dataLoaded = false;
//     if(window.location.href.includes("mat4/mine")) {
//       this.qlist.getMyQuotes().subscribe((res: any) => {
//         console.log("got the data for mine", res);
//         this.buildGrid(res);
//       })
//     } else if(window.location.href.includes("mat4/all")){
//       this.qlist.getAllQuotes().subscribe((res: any) => {
//         console.log("got the data for all", res);
//         this.buildGrid(res);
//       })
//     }
//   }
//   refreshMethod(){
//     this.dataLoaded = false;
//     if(window.location.href.includes("mat4/mine")) {
//       this.qlist.getMyQuotes().subscribe((res: any) => {
//         this.buildGrid(res);
        
//       })
//     } else if(window.location.href.includes("mat4/all")){
//       this.qlist.getAllQuotes().subscribe((res: any) => {
//         this.buildGrid(res);
//       })
//     }
//   }


//   open(content){
//     console.log("dialog open");
//     this.modalService.open(content,{ariaLabelledBy:'modal-basic-title'}).result.then((result)=>{
//       this.closeResult=`closed with:${result}`;
//     },
//     (reason)=>{
//       this.closeResult=`Dismissed ${this.getDismissReason(reason)}`;
//     },
//     );
//   }
//   private getDismissReason(reason:any):string{
//     if(reason===ModalDismissReasons.ESC){
//       return 'by pressing ESC';
//     }
//     else if(reason===ModalDismissReasons.BACKDROP_CLICK){
//       return 'by clicking on a backdrop';
//     }
//     else{
//       return `with:${reason}`;
//     }
//   }
//   getSpecificDialogue(type: string) {
//     switch (type) {
//       case "quotetype": return this.callAPIDialog1;
//       case "quoteid": return this.callAPIDialog2;
//       case "name": return this.callAPIDialog3;
//       case "cfu": return this.callAPIDialog4;
//       case "custname": return this.callAPIDialog5;
//       case "opportunity_id": return this.callAPIDialog6;
//       case "status": return this.callAPIDialog7;
//     }
//     return this.callAPIDialog1;
//   }
//   callAPI({ pageX, pageY, currentTarget }: MouseEvent, coltype: string): void {
//     const { height, width, top, left } = (currentTarget as HTMLElement).getBoundingClientRect();
//     console.log((currentTarget as HTMLElement).getBoundingClientRect());
//     const dialogRef = this.dialog.open(this.getSpecificDialogue(coltype), {

//       width: '350px',
//       height: '300px',
//       data: { name: this.name },
//       position: {
//         left: `${left + width / 2}px`, top: `${top + height}px`
//       }
//     }
//     );
//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed');

//       this.renderer.removeClass(this.iconElement.nativeElement, 'icon-remove');
//     });
//   }

//   isAllSelected() {
//     const numSelected = this.selection.selected.length;
//     const numRows = this.dataSource.data.length;
//     return numSelected === numRows;
//   }



//   /** Selects all rows if they are not all selected; otherwise clear selection. */
//   masterToggle() {
//     this.isAllSelected()
//       ? this.selection.clear()
//       : this.dataSource.data.forEach((row) => this.selection.select(row));
//   }

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
//       quotetype: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
//       name: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
//       quoteid: new FormControl(0),
//       cfu: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
//       custname: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
//       opportunity_id: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
//       status: new FormControl('', Validators.pattern('^[a-zA-Z ]+$'))
//     });
//   }
//   getTypeVal(colVal, inVal, filterType): boolean {
//     console.log("gettype val", colVal, inVal, filterType);
//     if (inVal === "" || inVal === 0 || inVal === "0" || inVal === null) {
//       console.log("returning true in null check", inVal);
//       return true;
//     }
//     colVal = String(colVal);
//     inVal = String(inVal);
//     switch (filterType) {
//       case "": return true;
//       case "Contains": return colVal.toLowerCase().includes(inVal);
//       case "Starts With": return colVal.toLowerCase().startsWith(inVal);
//       case "Ends With": return colVal.toLowerCase().endsWith(inVal);
//       case "Is equal to": return colVal.toLowerCase() == inVal.toLowerCase();
//       case "Does not contain ": return !colVal.toLowerCase().includes(inVal);
//     }
//     return true;
//   }
//   getFilterPredicate() {
//     return (row: any, filters: string) => {
//       const filterArray = filters.split('$');

//       return this.getTypeVal(row.contract.agreementType, filterArray[0], this.quoteTypeFilterOption)
//         && this.getTypeVal(row.quoteId, filterArray[1], this.quoteidFilterOption)
//         && this.getTypeVal(row.name, filterArray[2], this.quotenameFilterOption)
//         && this.getTypeVal(row.cfu, filterArray[3], this.cfuFilterOption)
//         && this.getTypeVal(row.customer.name, filterArray[4], this.custnameFilterOption)
//         && this.getTypeVal(row.opportunity.opportunityId, filterArray[5], this.opportunity_idFilterOption)
//         && this.getTypeVal(row.status, filterArray[6], this.statusFilterOption)

//     };
//   }
//   onCancel(): void {
//     this.dialog.closeAll();
//   }

//   applyFilter() {
//     var quotetype = this.searchForm.get('quotetype').value;
//     var quoteid = this.searchForm.get('quoteid').value;
//     var name = this.searchForm.get('name').value;
//     var cfu = this.searchForm.get('cfu').value;
//     var custname = this.searchForm.get('custname').value;
//     var opportunity_id = this.searchForm.get('opportunity_id').value;
//     var status = this.searchForm.get('status').value;


//     quotetype = quotetype === null ? '' : quotetype;
//     quoteid = quoteid === null ? '' : quoteid;
//     name = name === null ? '' : name;
//     cfu = cfu === null ? '' : cfu;
//     custname = custname === null ? '' : custname;
//     opportunity_id = opportunity_id === null ? '' : opportunity_id;
//     status = status === null ? '' : status;

//     this.dataSource.filter = (quotetype + "$" + quoteid + '$' + name + "$" + cfu + "$" + custname + '$' + opportunity_id + "$" + status).trim().toLowerCase();
//   }
//   selectedRow;
// }

// const QUOTE_DATA:any[] = [
//   {
//       "quoteId": 64050,
//       "name": "mhundekar - Untitled",
//       "status": "null",
//       "cfu": "OB",
//       "totalUpfront": "0",
//       "totalMonthly": "0",
//       "createdBy": "p4003712",
//       "createdDate": "2023-10-16T15:53:25",
//       "updatedBy": "p4003712",
//       "updatedDate": "2023-10-16T15:53:25",
//       "createdByUser": "Mohammed Hundekar",
//       "updatedByUser": "Mohammed Hundekar",
//       "customer": {
//           "uid": "43884",
//           "name": "BRT Customer - Victoria"
//       },
//       "opportunity": {
//           "opportunityId": "1-7N0R11"
//       },
//       "contract": {
//           "agreementType": "NEW",
//           "agreementId": null,
//           "agreementStatus": "Quote Created"
//       },
//       "avgArpu": null,
//       "avgEarpu": null,
//       "productId": null,
//       "version": "1",
//       "approvalSummary": null
//   },
//   {
//     "quoteId": 64051,
//     "name": "dsfjf - Untitled",
//     "status": "null",
//     "cfu": "OB",
//     "totalUpfront": "0",
//     "totalMonthly": "0",
//     "createdBy": "p4003712",
//     "createdDate": "2023-10-16T15:53:25",
//     "updatedBy": "p4003712",
//     "updatedDate": "2023-10-16T15:53:25",
//     "createdByUser": "Mohammed Hundekar",
//     "updatedByUser": "Mohammed Hundekar",
//     "customer": {
//         "uid": "43884",
//         "name": "fdhd Customer - Victoria"
//     },
//     "opportunity": {
//         "opportunityId": "1-7N0R11"
//     },
//     "contract": {
//         "agreementType": "NEW",
//         "agreementId": null,
//         "agreementStatus": "Quote Created"
//     },
//     "avgArpu": null,
//     "avgEarpu": null,
//     "productId": null,
//     "version": "1",
//     "approvalSummary": null
// },
// {
//   "quoteId": 64052,
//   "name": "fnn - Untitled",
//   "status": "null",
//   "cfu": "OB",
//   "totalUpfront": "0",
//   "totalMonthly": "0",
//   "createdBy": "p4003712",
//   "createdDate": "2023-10-16T15:53:25",
//   "updatedBy": "p4003712",
//   "updatedDate": "2023-10-16T15:53:25",
//   "createdByUser": "Mohammed Hundekar",
//   "updatedByUser": "Mohammed Hundekar",
//   "customer": {
//       "uid": "43884",
//       "name": "kjjgk Customer - Victoria"
//   },
//   "opportunity": {
//       "opportunityId": "1-7N0R12"
//   },
//   "contract": {
//       "agreementType": "resign",
//       "agreementId": null,
//       "agreementStatus": "Quote Created"
//   },
//   "avgArpu": null,
//   "avgEarpu": null,
//   "productId": null,
//   "version": "1",
//   "approvalSummary": null
// },
// {
//   "quoteId": 64053,
//   "name": "dfkkr - Untitled",
//   "status": "null",
//   "cfu": "OB",
//   "totalUpfront": "0",
//   "totalMonthly": "0",
//   "createdBy": "p4003712",
//   "createdDate": "2023-10-16T15:53:25",
//   "updatedBy": "p4003712",
//   "updatedDate": "2023-10-16T15:53:25",
//   "createdByUser": "Mohammed Hundekar",
//   "updatedByUser": "Mohammed Hundekar",
//   "customer": {
//       "uid": "43884",
//       "name": "axsda Customer - Victoria"
//   },
//   "opportunity": {
//       "opportunityId": "1-7N0R13"
//   },
//   "contract": {
//       "agreementType": "MACT",
//       "agreementId": null,
//       "agreementStatus": "Quote Created"
//   },
//   "avgArpu": null,
//   "avgEarpu": null,
//   "productId": null,
//   "version": "1",
//   "approvalSummary": null
// },
// {
//   "quoteId": 64054,
//   "name": "pdfdf - Untitled",
//   "status": "null",
//   "cfu": "OB",
//   "totalUpfront": "0",
//   "totalMonthly": "0",
//   "createdBy": "p4003712",
//   "createdDate": "2023-10-16T15:53:25",
//   "updatedBy": "p4003712",
//   "updatedDate": "2023-10-16T15:53:25",
//   "createdByUser": "Mohammed Hundekar",
//   "updatedByUser": "Mohammed Hundekar",
//   "customer": {
//       "uid": "43884",
//       "name": "pdsp Customer - Victoria"
//   },
//   "opportunity": {
//       "opportunityId": "1-7N0R14"
//   },
//   "contract": {
//       "agreementType": "Resign",
//       "agreementId": null,
//       "agreementStatus": "Quote Created"
//   },
//   "avgArpu": null,
//   "avgEarpu": null,
//   "productId": null,
//   "version": "1",
//   "approvalSummary": null
// }
// ];




