import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { AdabasService } from '../adabas.service';
import { FormGroup, FormControl } from '@angular/forms';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { FDT } from '../model/fdtCreateMap.model';
import { DbFileSelect } from '../model/dbFileSelect.model';

@Component({
  selector: 'ada-new-horizon-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.scss']
})
export class CriteriaComponent implements OnInit, OnChanges {
  @Input('fileSelected') fileSelected;
  @Input('fileSelection') fileSelection: DbFileSelect;
  int_fileSelected;
  int_fileSelection: DbFileSelect;
  browseList: string[];
  criteriaForm = new FormGroup({
    isn: new FormControl('', null),
    filter: new FormControl('', null),
    adabasMap: new FormControl('', null)
  });

  fileContentHeader: string;
  fileContentDialog: boolean;
  fileContentData: any;

  createMapDialog: boolean;
  createMapForm = new FormGroup({
    fileName: new FormControl('', null),
    adabasMap: new FormControl('', null)
  });

  fdtList= new Array<FDT>();

  constructor(private adabasSvc: AdabasService) {}

  ngOnInit() {
    this.adabasSvc.getBrowseFileService().subscribe(response => {
      this.browseList = response;
      console.log('this.browseList', this.browseList);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes.hasOwnProperty('fileSelected')) {
      this.int_fileSelected = changes.fileSelected.currentValue;
    }
    if (changes.hasOwnProperty('fileSelected')) {
      this.int_fileSelection = changes.fileSelection.currentValue;
    }
  }

  readFile(criteriaForm) {
    console.log(this.fileSelected);
    console.log(this.fileSelection);
    this.fileContentDialog = true;
    this.fileContentHeader = 'File Content of ' + criteriaForm.adabasMap;
    this.adabasSvc
      .readFileService(criteriaForm.adabasMap)
      .subscribe(response => {
        this.fileContentData = response;
      });
  }

  createMapPopUp() {
    this.createMapDialog = true;
    this.adabasSvc.readFDT('SAG-4YG72X2', 53222, 22).subscribe(response => {
      console.log('readFDT response', response);
      let fdt: FDT;
      for (let i = 0; i < response.length; i++) {
        fdt = {
          name: response[i].name,
          format: response[i].format,
          length: response[i].length
        };
        this.fdtList.push(fdt);
      }
      console.log('fdtList', this.fdtList);
    });



   
  }

  writeFile(createMapForm){
    this.adabasSvc.writeFileService(createMapForm.fileName, createMapForm.adabasMap).subscribe(response => {
      console.log('write response', response);
    });
  }
}
