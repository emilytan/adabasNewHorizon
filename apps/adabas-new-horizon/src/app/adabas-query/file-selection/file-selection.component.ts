import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'ada-new-horizon-file-selection',
  templateUrl: './file-selection.component.html',
  styleUrls: ['./file-selection.component.scss']
})
export class FileSelectionComponent implements OnInit {

  fileSelectForm: FormGroup;
  function: any = [
    { id: 0, name: "Read" },
    { id: 1, name: "Delete" },
    { id: 2, name: "Update" },
    { id: 3, name: "Create" }
  ];
  selectedFunction: any;

  constructor() { 
     this.fileSelectForm= new FormGroup({
      host: new FormControl(null, [], []),
      port: new FormControl(null, [], []),
      fnr: new FormControl(null, [], []),
      ddlFunction: new FormControl(0, [], [])
      }); 
  }

  ngOnInit() {
    this.selectedFunction = this.function[0];
  }

  fileSelect(fileSelectForm: any) { 

    
  }

  onChange($event) {

  }

}
