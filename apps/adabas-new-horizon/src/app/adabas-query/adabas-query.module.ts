import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdabasQueryComponent } from './adabas-query.component';
import { FileSelectionComponent } from './file-selection/file-selection.component';
import { CriteriaComponent } from './criteria/criteria.component';
import { QueryStatementComponent } from './query-statement/query-statement.component';
import { ReadResultComponent } from './read-result/read-result.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

// path = '/adabas-query'
const childRoutes: Routes = [
  {
    path: '',
    component: AdabasQueryComponent 
  }
]
@NgModule({
  declarations: [
    AdabasQueryComponent,
    FileSelectionComponent,
    CriteriaComponent,
    QueryStatementComponent,
    ReadResultComponent,
  ],
  imports: [
    RouterModule.forChild(childRoutes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
    NgxJsonViewerModule
  ]
})
export class AdabasQueryModule { }
