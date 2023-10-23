import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { Mat1Module } from './mat1/mat1.module';
import { Mat2Module } from './mat2/mat2.module';
import { Mat3Module } from './mat3/mat3.module';
import { Mat4Module } from './mat4/mat4.module';
import { ExampleDialogModule } from './example-dialog-component/example-dialog-component.module'
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';



@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
  
    MaterialModule,
    Mat1Module,
    Mat2Module,
    Mat3Module,
    Mat4Module,
    ExampleDialogModule ,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
