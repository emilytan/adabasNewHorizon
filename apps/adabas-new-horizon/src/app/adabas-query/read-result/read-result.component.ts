import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges
} from '@angular/core';

@Component({
  selector: 'ada-new-horizon-read-result',
  templateUrl: './read-result.component.html',
  styleUrls: ['./read-result.component.scss']
})
export class ReadResultComponent implements OnInit, OnChanges {
  @Input('readResult') readResult;
  allData = { data: [], keys: [] };
  displayData = new Array();
  pageSize = 10;
  pagination;
  paginationEnabled = true;
  showTable = false;
  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    this.showTable = false;
    if (this.readResult.length > 0) {
      this.showTable = true;
      this.allData.data = this.readResult;
      this.sanatizeData();
      this.populateDisplay(0, 19);
    }
  }

  refresh(event) {
    const page = event['page'];
    console.log('page properties', page);
    this.populateDisplay(page['from'], page['to']);
  }

  populateDisplay(from: number, to: number) {
    this.displayData = new Array();
    for (let i = from; i <= to; i++) {
      this.displayData.push(this.allData.data[i]);
    }
  }

  sanatizeData() {
    if (this.allData.data.length) {
      this.allData.keys = Object.keys(this.allData.data[0]);
      this.allData.data.forEach(row => {
        this.allData.keys.forEach(element => {
          if (
            Array.isArray(row[element]) ||
            (row[element] !== null && typeof row[element] === 'object')
          ) {
            row[element] = JSON.stringify(row[element]);
          }
        });
      });
    }
  }
}
