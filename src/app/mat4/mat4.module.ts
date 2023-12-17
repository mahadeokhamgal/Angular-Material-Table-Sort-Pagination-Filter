import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { Mat4Component } from './mat4.component';
import {MaterialModule} from '../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { PaginatorDirective } from './paginator.directive';
import { BubblePaginationDirective } from './bubble-pagintor.directive';


@NgModule({
  declarations: [
    Mat4Component,
    PaginatorDirective,
    
  ],
  exports: [
    Mat4Component,
    PaginatorDirective,
    BubblePaginationDirective,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatIconModule,
    BubblePaginationDirective,
  ]
})
export class Mat4Module {
}
