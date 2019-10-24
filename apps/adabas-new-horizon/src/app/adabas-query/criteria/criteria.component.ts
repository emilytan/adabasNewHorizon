import { Component, OnInit, Input } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { AdabasService } from '../adabas.service';
import { FormGroup, FormControl } from '@angular/forms';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@Component({
  selector: 'ada-new-horizon-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.scss']
})
export class CriteriaComponent implements OnInit {
  @Input('fileSelected') fileSelected;
  @Input('fileSelection') fileSelection;
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

  constructor(private adabasSvc: AdabasService) {}

  ngOnInit() {
    this.adabasSvc.getBrowseFileService().subscribe(response => {
      this.browseList = response;
      console.log('this.browseList', this.browseList);
    });
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

  writeFile() {
    this.createMapDialog = true;
    this.adabasSvc.writeFileService().subscribe(response => {
      console.log('write response', response);
    });
  }
}
