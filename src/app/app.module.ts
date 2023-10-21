import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { Mat1Module } from './mat1/mat1.module';
import { Mat2Module } from './mat2/mat2.module';

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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
