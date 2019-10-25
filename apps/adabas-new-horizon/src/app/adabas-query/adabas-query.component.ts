import { Component, OnInit } from '@angular/core';
import { DbFileSelect } from './model/dbFileSelect.model';
import { sampleResult } from './read-result/sample-result';
import { AdabasService } from './adabas.service';

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
  sqlStatement = '';
  adaMapContent;

  error = null;
  msg = null;
  result = null;

  constructor(private adabasSvc: AdabasService) {}

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
    this.sqlStatement = event['sqlStatement'];
    this.adaMapContent = event['adaMapContent'];
    this.execute(this.sqlStatement);
  }

  execute(query) {
    this.adabasSvc.sql(this.selectedDBFile.host, this.selectedDBFile.port, query, this.adaMapContent).subscribe(
      res => {
        this.error = null;
        if (typeof res === 'number') {
          this.result = null;
          this.msg =
            query
              .replace(/^[ \t]+/gm, '')
              .replace(/^[ \r\n]+/gm, ' ')
              .substring(0, 6)
              .toUpperCase() +
            'statement executed successfully, ISN ' +
            res +
            ' ' +
            this.selectedDBFile.ddlFunction;
        } else {
          this.msg = null;
          if (res instanceof Array) {
            this.result = res;
          } else {
            let arr = new Array<any>();
            arr.push(res);
            this.result = arr;
          }
        }
      },
      error => {
        this.msg = null;
        this.result = null;
        console.log(error);
        this.error = error.error.message + '. please check your SQL query. ';
        // TODO_ERROR: Check how to handle
      }
    );
  }
}
