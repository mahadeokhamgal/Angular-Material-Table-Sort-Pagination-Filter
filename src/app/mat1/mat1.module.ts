import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Mat1Component} from './mat1.component';
import {MaterialModule} from '../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    Mat1Component,
  ],
  exports: [
    Mat1Component
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ]
})
export class Mat1Module {
}
