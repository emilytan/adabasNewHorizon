import { Component, OnInit } from '@angular/core';
import { DbFileSelect } from './model/dbFileSelect.model';
import { sampleResult } from './read-result/sample-result';

@Component({
  selector: 'ada-new-horizon-adabas-query',
  templateUrl: './adabas-query.component.html',
  styleUrls: ['./adabas-query.component.scss']
})
export class AdabasQueryComponent implements OnInit {
  selectedDBFile: DbFileSelect;
  fileSelected = false;
  sampleResult;
  criteriaInput;
  criteriaConfirmation;
  sqlStatement = "";

  constructor() {}

  ngOnInit() {
    this.sampleResult = sampleResult;
  }

  eventDbFileSelect(event: DbFileSelect) {
    this.selectedDBFile = new DbFileSelect(event);
  }

  eventDbFileSelected(event: boolean) {
    this.selectedDBFile = new DbFileSelect(event);
    this.fileSelected = event;
  }

  eventCriteriaSelect(event: any) {
    this.criteriaInput = event;
  }

  eventCriteriaConfirmation(event: boolean) {
    this.criteriaConfirmation = event;
  }

  eventExecuteSqlQuery(event: string) {
    this.sqlStatement = event;
  }
}
