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

  constructor(private adabasSvc: AdabasService) { }

  ngOnInit() {
    this.getBrowseFile().subscribe(response => {
      this.browseList = response;
      console.log('this.browseList', this.browseList);

    });
  }

  getBrowseFile() {
    return this.adabasSvc.getRest('fileio/browsefile').pipe(
      map(jsonResponse => {
        console.log('jsonResponse', jsonResponse);
        return jsonResponse;
      }),
      catchError((err) => {
        return err;
      })
    );
  }

  readFile(criteriaForm) {
    console.log('criteriaForm', criteriaForm);
    const file = '{"file":"' + criteriaForm.adabasMap + '"}';
    console.log('file:', file);
    return this.adabasSvc.getRest('fileio/readfile').pipe(
      map(jsonResponse => {
        console.log('jsonResponse', jsonResponse);
        return jsonResponse;
      }),
      catchError((err) => {
        return err;
      })
    );

  }

}
