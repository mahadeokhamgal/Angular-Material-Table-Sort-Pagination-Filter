import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Mat2Component } from './mat2/mat2.component';
import { Mat1Component } from './mat1/mat1.component';
import { Mat3Component } from './mat3/mat3.component';
import { Mat4Component } from './mat4/mat4.component';

const routes = [
  {path: '', redirectTo:'mat4'},
  {path: 'mat1', component: Mat1Component},
      {path: 'mat2', component: Mat2Component},
      {path: 'mat3', component: Mat3Component},
      {path: 'mat4', component: Mat4Component},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule {
  
 }