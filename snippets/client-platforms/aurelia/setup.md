```js
// app.js

import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)

export class App {
  lock = new Auth0Lock('<%= account.clientId %>', '<%= account.namespace %>', {
    auth: { redirect: false }
  });
  isAuthenticated = false;
  
  constructor(http) {
    this.http = http;
    var self = this;
    this.lock.on("authenticated", (authResult) => {
      self.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          return;
        }

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        self.isAuthenticated = true;
        self.lock.hide();
      });
    });
  }
}
```