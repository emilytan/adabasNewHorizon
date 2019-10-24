import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ada-new-horizon-query-statement',
  templateUrl: './query-statement.component.html',
  styleUrls: ['./query-statement.component.scss']
})
export class QueryStatementComponent implements OnInit {
  @Input('fileSelected') fileSelected;
  @Input('fileSelection') fileSelection;
  @Input('criteriaInput') criteriaInput;

  constructor() { }

  ngOnInit() {
  }

}
