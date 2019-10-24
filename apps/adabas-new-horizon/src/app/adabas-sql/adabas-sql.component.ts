import { Component, OnInit } from '@angular/core';
import { AdabasService } from '../adabas-query/adabas.service';

@Component({
  selector: 'ada-new-horizon-adabas-sql',
  templateUrl: './adabas-sql.component.html',
  styleUrls: ['./adabas-sql.component.scss']
})
export class AdabasSqlComponent implements OnInit {
  sql = 'SELect * FROM 11 WHERE AA=000095';
  result = null;
  msg = null;
  constructor(private svc: AdabasService) {}

  ngOnInit() {}

  execute(query) {
    this.svc.sql('localhost', 50001, query).subscribe(res => {
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
    });
  }
}
