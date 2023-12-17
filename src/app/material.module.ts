import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCommonModule, MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ResizableModule } from 'angular-resizable-element';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';



@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatTableModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    ResizableModule,
    MatRippleModule,
    MatButtonModule, 
    MatCommonModule, 
    MatDialogModule, 
    FormsModule,
    MatTabsModule
 
],
  exports: [
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatSelectModule,
    MatSortModule,
    MatInputModule,
    MatAutocompleteModule,
    MatPaginatorModule,

    MatCheckboxModule,
    ResizableModule,
    MatRippleModule,
    MatTabsModule
  ]
})
export class MaterialModule {}
