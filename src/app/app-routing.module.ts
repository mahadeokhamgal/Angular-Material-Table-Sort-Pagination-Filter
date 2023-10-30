import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Mat4Component } from './mat4/mat4.component';

const routes = [
      {path: 'mat4/all', component: Mat4Component},
      {path: 'mat4/mine', component: Mat4Component},
      {path: '', redirectTo:'mat4/mine'},
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
