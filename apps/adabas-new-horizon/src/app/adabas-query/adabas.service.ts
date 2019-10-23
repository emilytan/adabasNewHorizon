import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, timeoutWith } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdabasService {

  constructor(private httpreq: HttpClient) { }

  
  getRest(resturl: string): any {
    const url =  'http://localhost:3333/api/' + resturl;
    console.log('url', url);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    return this.httpreq.get(url, httpOptions).pipe(
      timeoutWith(180000, throwError(new Error('Server request timeout: ' + resturl))),
      catchError((e) => {
        console.log('e', e);
        return throwError(e);
      })
    );
  }
}
