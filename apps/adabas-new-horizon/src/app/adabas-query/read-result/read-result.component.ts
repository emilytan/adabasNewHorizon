import { Component, OnInit } from '@angular/core';
import { sampleResult } from './sample-result';

@Component({
  selector: 'ada-new-horizon-read-result',
  templateUrl: './read-result.component.html',
  styleUrls: ['./read-result.component.scss']
})
export class ReadResultComponent implements OnInit {
  keys;
  result = sampleResult;
  constructor() {}

  ngOnInit() {
    console.log(this.result);
    console.log('keys', Object.keys(this.result[0]));

    if (this.result.length) {
      this.keys = Object.keys(this.result[0]);
      this.result.forEach((row) => {
        this.keys.forEach(element => {
          if (Array.isArray(row[element]) || (row[element] !== null && typeof (row[element]) === 'object')) {
            row[element] = JSON.stringify(row[element]);
          }
          
        });
      });
    }
  }
}
