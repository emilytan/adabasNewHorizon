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
  constructor() { }

  ngOnInit() {
    console.log(this.result);
    console.log('keys', Object.keys(this.result[0]));

    this.keys = Object.keys(this.result[0]);
  }

}
