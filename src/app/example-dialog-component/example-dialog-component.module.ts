
import { NgModule } from '@angular/core'; 
import { FormsModule } from '@angular/forms'; 
// import { 
//   MatButtonModule, 
//   MatCommonModule, 
//   MatDialogModule, 
//   MatFormFieldModule, 
//   MatInputModule, 
// } from '@angular/material'; 
import {MaterialModule} from '../material.module';
  
import { ExampleDialogComponentComponent } from './example-dialog-component.component'; 
  
@NgModule({ 
  declarations: [ExampleDialogComponentComponent], 
  exports: [ExampleDialogComponentComponent], 
  imports: [ 
    FormsModule, 
    MaterialModule
   
  ], 
}) 
export class ExampleDialogModule {}