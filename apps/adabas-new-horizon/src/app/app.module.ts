import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdcButtonModule,
  MdcFabModule,
  MdcIconModule,
  MDCDataTableModule,
  MdcCheckboxModule
} from '@angular-mdc/web';

const appRoutes: Routes = [
  // path = '/adabas-query'
  {
    path: 'adabas-query',
    loadChildren: () =>
      import('./adabas-query/adabas-query.module').then(
        m => m.AdabasQueryModule
      )
  },
  // path = '/'
  { path: '', redirectTo: '/adabas-query', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    MdcButtonModule,
    MdcFabModule,
    MdcIconModule,
    MDCDataTableModule,
    MdcCheckboxModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
