import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdabasSqlComponent } from './adabas-sql.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ReadResultComponent } from '../adabas-query/read-result/read-result.component';
import { AdabasService } from '../adabas-query/adabas.service';


const childRoutes1: Routes = [
  {
    path: '',
    component: AdabasSqlComponent 
  }
]
@NgModule({
  declarations: [AdabasSqlComponent, ReadResultComponent],
  imports: [
    RouterModule.forChild(childRoutes1),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
    NgxJsonViewerModule
  ],
  providers: [AdabasService]
})
export class AdabasSqlModule { }
