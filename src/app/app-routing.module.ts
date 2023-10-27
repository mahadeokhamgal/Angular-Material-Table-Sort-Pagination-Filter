import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Mat4Component } from './mat4/mat4.component';

const routes = [
      {path: 'mat4', component: Mat4Component},
      {path: '', redirectTo:'mat4'},
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
