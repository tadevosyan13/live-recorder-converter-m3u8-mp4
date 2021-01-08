import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
    })
};

@Injectable({
  providedIn: 'root'
})

export class BlobService {

  constructor(private http: HttpClient) { }



    sendBlob(fd) {
        return this.http.post('http://127.0.0.1:3000/blob', {url:fd});
    }



}
