import { Component, OnInit } from '@angular/core';
import { sampleResult } from './sample-result';

@Component({
  selector: 'ada-new-horizon-read-result',
  templateUrl: './read-result.component.html',
  styleUrls: ['./read-result.component.scss']
})
export class ReadResultComponent implements OnInit {
  allData = { data: sampleResult, keys: [] }
  displayData = new Array();
  pageSize = 10;
  pagination;
  paginationEnabled = true;
  constructor() {}

  ngOnInit() {
    console.log(this.allData);
    console.log('keys', Object.keys(this.allData.data[0]));
    this.sanatizeData();
    this.populateDisplay(0, 19);
  }

  refresh(event) {
    const page = event['page'];
    console.log('page properties', page);
    this.populateDisplay(page['from'], page['to']);
  }

  populateDisplay(from: number, to: number) {
    this.displayData = new Array();
    for(let i = from; i <= to; i++) {
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
