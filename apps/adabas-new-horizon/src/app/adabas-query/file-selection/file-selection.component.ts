import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { functionType } from '../model/function-type.model';
import { DbFileSelect } from '../model/dbFileSelect.model';

@Component({
  selector: 'ada-new-horizon-file-selection',
  templateUrl: './file-selection.component.html',
  styleUrls: ['./file-selection.component.scss']
})
export class FileSelectionComponent implements OnInit {
  @Output('dbFileSelect') dbFileSelect = new EventEmitter();
  fileSelected = false;
  selectedChoice: DbFileSelect;

  fileSelectForm: FormGroup;
  function: any = [
    { id: 0, name: functionType.read },
    { id: 1, name: functionType.delete },
    { id: 2, name: functionType.update },
    { id: 3, name: functionType.create }
  ];

  constructor() {
    this.fileSelectForm = new FormGroup({
      host: new FormControl(null, [], []),
      port: new FormControl(null, [], []),
      fnr: new FormControl(null, [], []),
      ddlFunction: new FormControl(0, [], [])
    });
  }

  ngOnInit() {}

  fileSelect(fileSelectForm: any) {
    this.selectedChoice = new DbFileSelect(fileSelectForm);
    this.fileSelected = true;
    this.dbFileSelect.emit(this.selectedChoice);
  }

  editSelection() {
    this.fileSelected = false;
  }
}
