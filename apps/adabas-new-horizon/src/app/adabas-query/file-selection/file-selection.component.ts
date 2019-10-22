import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ada-new-horizon-file-selection',
  templateUrl: './file-selection.component.html',
  styleUrls: ['./file-selection.component.scss']
})
export class FileSelectionComponent implements OnInit {

  fileSelectForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
