import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { Mat4Component } from './mat4.component';
import {MaterialModule} from '../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    Mat4Component,
  ],
  exports: [
    Mat4Component
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatIconModule,
  ]
})
export class Mat4Module {
}
