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
import { FDT, AdabasMap } from '../model/fdtCreateMap.model';
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
    adabasMap: new FormControl('none', null)
  });

  fileContentHeader: string;
  fileContentDialog: boolean;
  fileContentData: any;

  createMapDialog: boolean;
  createMapForm = new FormGroup({
    fileName: new FormControl('', null)
  });

  fdtList = new Array<AdabasMap>();

  constructor(private adabasSvc: AdabasService) {}

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
    if (changes.hasOwnProperty('fileSelected')) {
      this.int_fileSelected = changes.fileSelected.currentValue;
    }
    if (changes.hasOwnProperty('fileSelected')) {
      this.int_fileSelection = changes.fileSelection.currentValue;
    }
  }

  getBrowseList(){
    this.adabasSvc.getBrowseFileService().subscribe(response => {
      this.browseList = response;
      // console.log('this.browseList', this.browseList);
    });
  }

  readFile(criteriaForm) {
    // console.log(this.fileSelected);
    // console.log(this.fileSelection);
    // console.log(criteriaForm.adabasMap);
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
    this.fdtList  = new Array<AdabasMap>();
    this.createMapForm.reset();
    if (this.fileSelected) {
      this.adabasSvc
        .readFDT(
          this.fileSelection.host,
          this.fileSelection.port,
          this.fileSelection.fnr
        )
        .subscribe(response => {
          for (let i = 0; i < response.length; i++) {
            switch (response[i].format) {
              case 'A':
                response[i].format = 'ALPHA';
                break;
              case 'B':
                response[i].format = 'BINARY';
                break;
              case 'F':
                response[i].format = 'FLOAT';
                break;
              case 'G':
                response[i].format = 'FIXED';
                break;
              case 'P':
                response[i].format = 'PACKED';
                break;
              case 'U':
                response[i].format = 'UNPACKED';
                break;
              case 'W':
                response[i].format = 'WIDE';
                break;
            }
            let fdt: AdabasMap;
            fdt = {
              state: false,
              shortName: response[i].name,
              type: response[i].format,
              size: response[i].length,
              longName: ''
            };
            this.fdtList.push(fdt);
          }
          // console.log('fdtList', this.fdtList);
        });
    }
  }

  writeFile(createMapForm) {
    // console.log('file name: ', createMapForm.value.fileName);
    const fileName = createMapForm.value.fileName;
    const fdtMapList = new Array<AdabasMap>();
    for (let i = 0; i < this.fdtList.length; i++) {
      if (this.fdtList[i].state) {
        let fdtMap: AdabasMap;
        fdtMap = {
          shortName: this.fdtList[i].shortName,
          type: this.fdtList[i].type,
          size: this.fdtList[i].size,
          longName: this.fdtList[i].longName
        };
        fdtMapList.push(fdtMap);
      }
    }
    const fileContent = JSON.stringify({ map: fdtMapList });
    // console.log('map to json: ', fileContent);
    this.adabasSvc
      .writeFileService(fileName, fileContent)
      .subscribe(response => {
        // console.log('write response', response);
        this.createMapDialog = false;
      });
  }
}
