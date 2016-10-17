```js
// src/pages/ping/ping.ts

import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {AuthHttp} from 'angular2-jwt';
import {AuthService} from '../../services/auth/auth.service';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'ping.html',
})
export class PingPage {
  message: string;
  error: string;
  
  constructor(private http: Http, private authHttp: AuthHttp, public auth: AuthService) {}
  
  ping() {
    // Change the endpoint up for
    // one that points to your own server.
    this.http.get('http://localhost:3001/ping')
      .map(res => res.json())
      .subscribe(
        data => this.message = data.text,
        err => this.error = err
      );
  }
  
  securedPing() {
    // Here we use authHttp to make an authenticated
    // request to the server. Change the endpoint up for
    // one that points to your own server.
    this.authHttp.get('http://localhost:3001/secured/ping')
      .map(res => res.json())
      .subscribe(
        data => this.message = data.text,
        err => this.error = err
      );
  }
  
}
```