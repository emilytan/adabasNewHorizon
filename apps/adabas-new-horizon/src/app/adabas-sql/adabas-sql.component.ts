import { Component, OnInit } from '@angular/core';
import { AdabasService } from '../adabas-query/adabas.service';

@Component({
  selector: 'ada-new-horizon-adabas-sql',
  templateUrl: './adabas-sql.component.html',
  styleUrls: ['./adabas-sql.component.scss']
})
export class AdabasSqlComponent implements OnInit {
  sql = 'SELect * FROM 20';
  result = null;
  msg = null;
  error = null;
  host = '';
  port = '';
  constructor(private svc: AdabasService) {}

  ngOnInit() {}

  execute(query) {
    this.svc.sql(this.host, Number(this.port), query).subscribe(
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
            ' updated';
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
