```js
// app/pages/ping/ping.ts

]import {Page} from 'ionic-framework/ionic';
import {AuthHttp} from 'angular2-jwt';
import {AuthService} from '../../services/auth/auth';
const map = require('rxjs/add/operator/map');

@Page({
  templateUrl: 'build/pages/ping/ping.html',
})
export class PingPage {
  message: string;
  error: string;
  
  constructor(private authHttp: AuthHttp, private auth: AuthService) {}
  
  securedPing() {
    // Here we use authHttp to make an authenticated
    // request to the server. Change the endpoint up for
    // one that points to your own server.
    this.authHttp.get('http://example.com/secured/ping')
      .map(res => res.json())
      .subscribe(
        data => this.message = data,
        err => this.error = err
      );
  }
  
}
```