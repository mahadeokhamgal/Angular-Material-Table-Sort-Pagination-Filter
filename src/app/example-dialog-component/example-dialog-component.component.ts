import { Component, Inject } from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-example-dialog-component',
  templateUrl: './example-dialog-component.component.html',
  styleUrls: ['./example-dialog-component.component.css']
})
export class ExampleDialogComponentComponent {
  constructor( 
    public dialogRef: MatDialog, 
    @Inject(MAT_DIALOG_DATA) public data: any) { } 
  
  onCancel(): void { 
    this.dialogRef.closeAll(); 
  } 
  onSubmit():void{
    this.dialogRef.closeAll();
   
}
}
