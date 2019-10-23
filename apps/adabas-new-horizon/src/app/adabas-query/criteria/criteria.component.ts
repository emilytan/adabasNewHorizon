import { Component, OnInit } from '@angular/core';
import { catchError, map,  } from 'rxjs/operators';
import { AdabasService } from '../adabas.service';


@Component({
  selector: 'ada-new-horizon-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.scss']
})
export class CriteriaComponent implements OnInit {

   browseList: string[];

  constructor(private adabasSvc: AdabasService) { }

  ngOnInit() {
    this.getBrowseFile().subscribe( response => {
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

}
