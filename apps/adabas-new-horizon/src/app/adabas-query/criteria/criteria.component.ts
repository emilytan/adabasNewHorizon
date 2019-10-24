import { Component, OnInit } from '@angular/core';
import { catchError, map, } from 'rxjs/operators';
import { AdabasService } from '../adabas.service';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'ada-new-horizon-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.scss']
})
export class CriteriaComponent implements OnInit {

  browseList: string[];
  criteriaForm = new FormGroup({
    isn: new FormControl('', null),
    filter: new FormControl('', null),
    adabasMap: new FormControl('', null),
  });

  fileContentHeader: string;
  fileContentDialog: boolean;
  fileContentData: any;

  createMapDialog: boolean;
  createMapForm = new FormGroup({
    fileName: new FormControl('', null),
    adabasMap: new FormControl('', null),
  });

  constructor(private adabasSvc: AdabasService) { }

  ngOnInit() {
    this.adabasSvc.getBrowseFileService().subscribe(response => {
      this.browseList = response;
      console.log('this.browseList', this.browseList);
    });
  }


  readFile(criteriaForm){
    this.fileContentDialog = true;
    this.fileContentHeader = 'File Content of ' + criteriaForm.adabasMap;
    this.adabasSvc.readFileService(criteriaForm.adabasMap).subscribe(response => {
      console.log('read response', response);
      this.fileContentData = response;
      console.log('fileContentData', this.fileContentData);
  
    });
    // const fileContent = '{"map": [{"type": "ALPHA","shortname": "AA","longname": "testAA","size": "8"},{"type": "GROUP","shortname": "AB","longname": "testAB","child": [{"type": "ALPHA","shortname": "AC","longname": "testAC","size": 20}]}]}';
    // JSON.stringify(fileContent);
    
   
  }



  writeFile(){
    this.createMapDialog = true;
    this.adabasSvc.writeFileService().subscribe(response => {
      console.log('write response', response);
    });
  }

  


}
