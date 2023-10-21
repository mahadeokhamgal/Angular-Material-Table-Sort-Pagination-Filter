import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Mat2Component} from './mat2.component';
import {MaterialModule} from '../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    Mat2Component,
  ],
  exports: [
    Mat2Component
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class Mat2Module {
}
