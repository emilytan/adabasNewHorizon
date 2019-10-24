import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, timeoutWith } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdabasService {
  constructor(private httpreq: HttpClient) {}

  getRest(resturl: string): any {
    const url = 'http://localhost:3333/api/' + resturl;
    console.log('url', url);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.httpreq.get(url, httpOptions).pipe(
      timeoutWith(
        180000,
        throwError(new Error('Server request timeout: ' + resturl))
      ),
      catchError(e => {
        console.log('e', e);
        return throwError(e);
      })
    );
  }

  postRest(resturl: string, data: any): any {
    const url = 'http://localhost:3333/api/' + resturl;
    console.log('url', url);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.httpreq.post(url, data, httpOptions).pipe(
      timeoutWith(
        180000,
        throwError(new Error('Server request timeout: ' + resturl))
      ),
      catchError(e => {
        console.log('e', e);
        return throwError(e);
      })
    );
  }

  getBrowseFileService() {
    return this.getRest('fileio/browsefile').pipe(
      map(jsonResponse => {
        // console.log('jsonResponse', jsonResponse);
        return jsonResponse;
      }),
      catchError(err => {
        return err;
      })
    );
  }

  readFileService(fileName) {
    const postBody = JSON.stringify({ file: fileName });
    return this.postRest('fileio/readfile', postBody.toString()).pipe(
      map(jsonResponse => {
        // console.log('jsonResponse', jsonResponse);
        return jsonResponse;
      }),
      catchError(err => {
        return err;
      })
    );
  }

  readFDT(host: string, port: number, fileId: number) {
    const url = host + '/' + port + '/fdt/fileid/' + fileId;
    return this.getRest(url).pipe(
      map(jsonResponse => {
        // console.log('jsonResponse', jsonResponse);
        return jsonResponse;
      }),
      catchError(err => {
        return err;
      })
    );
  }

  writeFileService(fileName: string, fileContent: string) {
    const postBody = JSON.stringify({ file: fileName, content: fileContent});
    // console.log('write body data :', postBody);

    return this.postRest('fileio/writefile', postBody).pipe(
      map(jsonResponse => {
        // console.log('jsonResponse', jsonResponse);
        return jsonResponse;
      }),
      catchError(err => {
        return err;
      })
    );
  }
}
