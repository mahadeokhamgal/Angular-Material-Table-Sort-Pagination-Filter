
import { Component } from '@angular/core'; 
import { MatDialog } from '@angular/material/dialog'; 
  
import { ExampleDialogComponentComponent } from './example-dialog-component/example-dialog-component.component';
  
@Component({ 
  selector: 'app-root', 
  templateUrl: 'app.component.html', 
}) 
export class AppComponent { 
  
  animal: string; 
  name: string; 
  
  constructor(public dialog: MatDialog) {} 
  
  openDialog(): void { 
    let dialogRef = this.dialog.open(ExampleDialogComponentComponent ,{ 
      width: '450px', 
      data: { name: this.name, animal: this.animal } 
    }); 
  
    dialogRef.afterClosed().subscribe(result => { 
      this.animal = result; 
    }); 
  } 
  
} 

