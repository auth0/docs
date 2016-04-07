```js
// app.js

import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)

export class App {
  lock = new Auth0Lock('<%= account.clientId %>', '<%= account.namespace %>');
  isAuthenticated = false;
  
  constructor(http) {
    this.http = http;
  }
}
```