import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ada-new-horizon-adabas-sql',
  templateUrl: './adabas-sql.component.html',
  styleUrls: ['./adabas-sql.component.scss']
})
export class AdabasSqlComponent implements OnInit {

  sql =  'update 11 SET AH=444, AO=VENT60 WHERE AA=00000022';
  constructor() { }

  ngOnInit() {
  }

}
