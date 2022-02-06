import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MateriaModule } from './material.module';
import { MojicodeComponent } from './pages/mojicode/mojicode.component';
import {HttpClientModule } from '@angular/common/http';
import { CartComponent } from './shared/components/cart/cart.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MojicodeComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MateriaModule,
    BrowserAnimationsModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
