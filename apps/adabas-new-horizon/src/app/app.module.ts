import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {
  MdcButtonModule,
  MdcFabModule,
  MdcIconModule,
  MDCDataTableModule,
  MdcCheckboxModule, 
} from '@angular-mdc/web';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    MdcButtonModule,
    MdcFabModule,
    MdcIconModule,
    MDCDataTableModule, 
    MdcCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

