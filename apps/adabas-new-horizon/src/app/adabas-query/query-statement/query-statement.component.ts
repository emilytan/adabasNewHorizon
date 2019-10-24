import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { DbFileSelect } from '../model/dbFileSelect.model';
import { functionType } from '../model/function-type.model';
import { CriteriaModel } from '../model/criteria.model';
import { AdabasService } from '../adabas.service';
import { RESTAdaMap } from '@ada-new-horizon/api-interfaces';

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
  sqlStatement = '';
  adaMapContent;

  constructor(private adabasSvc: AdabasService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.fileSelected && this.criteriaConfirmation) {
      console.log('populate SQL Statement now!');
      this.adaMapContent = new Array<RESTAdaMap>();
      if (
        this.criteriaInput.adabasMap !== '' &&
        this.criteriaInput.adabasMap !== 'none'
      ) {
        this.adabasSvc
          .readFileService(this.criteriaInput.adabasMap)
          .subscribe(content => {
            this.adaMapContent = content['map'];
            this.buildSqlStatement();
          });
      } else {
        this.buildSqlStatement();
      }
    }
  }

  buildSqlStatement() {
    if (this.fileSelection.ddlFunction === functionType.read) {
      this.buildSelect();
    } else if (this.fileSelection.ddlFunction === functionType.delete) {
      this.buildDelete();
    } else if (this.fileSelection.ddlFunction === functionType.update) {
      this.buildUpdate();
    } else if (this.fileSelection.ddlFunction === functionType.create) {
      this.buildCreate();
    } else {
      console.log('Invalid function type');
    }
  }

  buildSelect() {
    let longnames = new Array<string>();
    this.sqlStatement = 'SELECT ';
    if (this.adaMapContent.length > 0) {
      longnames = this.getLongName();
      this.sqlStatement += longnames.join(',');
    } else {
      this.sqlStatement += '*';
    }
    this.sqlStatement += ' FROM ' + this.fileSelection.fnr + ' ';
    if (this.criteriaInput.textisn !== '') {
      this.sqlStatement += 'WHERE ISN = ' + this.criteriaInput.textisn + ' ';
    } else if (this.criteriaInput.textfilter !== '') {
      this.sqlStatement += 'WHERE ' + this.criteriaInput.textfilter + ' ';
    }
  }

  buildDelete() {}

  buildUpdate() {}

  buildCreate() {}

  getLongName(): string[] {
    let longnames = new Array<string>();
    this.adaMapContent.forEach(element => {
      longnames.push(element['longName']);
    });
    return longnames;
  }
  executeQuery() {
    this.execute.emit(this.sqlStatement);
  }
}
