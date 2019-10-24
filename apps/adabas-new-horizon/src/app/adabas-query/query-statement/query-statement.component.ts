import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { DbFileSelect } from '../model/dbFileSelect.model';
import { functionType } from '../model/function-type.model';
import { CriteriaModel } from '../model/criteria.model';

@Component({
  selector: 'ada-new-horizon-query-statement',
  templateUrl: './query-statement.component.html',
  styleUrls: ['./query-statement.component.scss']
})
export class QueryStatementComponent implements OnInit, OnChanges {
  @Input('fileSelected') fileSelected;
  @Input('fileSelection') fileSelection: DbFileSelect;
  @Input('criteriaInput') criteriaInput: CriteriaModel;
  @Input('criteriaConfirmation') criteriaConfirmation;
  @Output('execute') execute = new EventEmitter();
  sqlStatement = "";

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.fileSelected && this.criteriaConfirmation) {
      console.log("populateDB now!");
      this.buildSqlStatement();
    }
  }

  buildSqlStatement() {
    if(this.fileSelection.ddlFunction === functionType.read) {
      this.buildSelect();
    } else if(this.fileSelection.ddlFunction === functionType.delete) {
      this.buildDelete();
    } else if(this.fileSelection.ddlFunction === functionType.update) {
      this.buildUpdate();
    } else if(this.fileSelection.ddlFunction === functionType.create) {
      this.buildCreate();
    } else {
      console.log("Invalid function type");
    }
  }

  buildSelect() {
    this.sqlStatement = "SELECT * FROM " + this.fileSelection.fnr + " ";
    if (this.criteriaInput.textisn !== "") {
      this.sqlStatement += "WHERE ISN = " + this.criteriaInput.textisn + " ";
    }
    if (this.criteriaInput.textfilter !== "") {
      this.sqlStatement += "WHERE " + this.criteriaInput.textfilter + " ";
    }
  }

  buildDelete() {}

  buildUpdate() {}

  buildCreate() {}

  executeQuery() {
    this.execute.emit(this.sqlStatement);
  }
}
