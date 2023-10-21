import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { Mat3Component } from './mat3.component';
import {MaterialModule} from '../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    Mat3Component,
  ],
  exports: [
    Mat3Component
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ]
})
export class Mat3Module {
}
