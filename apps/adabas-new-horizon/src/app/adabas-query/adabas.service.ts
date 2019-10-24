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

  postRest(resturl: string, data: string): any {
    const url =  'http://localhost:3333/api/' + resturl;
    console.log('url', url);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    return this.httpreq.post(url, data, httpOptions).pipe(
      timeoutWith(180000, throwError(new Error('Server request timeout: ' + resturl))),
      catchError((e) => {
        console.log('e', e);
        return throwError(e);
      })
    );
  }


  getBrowseFileService() {
    return this.getRest('fileio/browsefile').pipe(
      map(jsonResponse => {
        console.log('jsonResponse', jsonResponse);
        return jsonResponse;
      }),
      catchError((err) => {
        return err;
      })
    );
  }

  readFileService(fileName) {
    const readBody = '{"file":"' + fileName + '"}';
    console.log('readBody:', readBody);
    const postBody = JSON.stringify(readBody);
    postBody.toString();
    return this.postRest('fileio/readfile', postBody).pipe(
      map(jsonResponse => {
        console.log('jsonResponse', jsonResponse);
        return jsonResponse;
      }),
      catchError((err) => {
        return err;
      })
    );
  }

  writeFileService() {
    const fileName = 'test2.txt';
    const fileContent = '{"map": [{"type": "ALPHA","shortname": "AA","longname": "testAA","size": "8"},{"type": "GROUP","shortname": "AB","longname": "testAB","child": [{"type": "ALPHA","shortname": "AC","longname": "testAC","size": 20}]}]}';
    const writeBody = '{ "file":"' + fileName + '", "content":"' + fileContent.toString() + '" }';
    console.log('write body data :', writeBody);

    return this.postRest('fileio/writefile', writeBody).pipe(
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
