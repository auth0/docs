```js
// app/app.ts

import {App, Platform} from 'ionic-framework/ionic';
import {TabsPage} from './pages/tabs/tabs';
import {provide} from 'angular2/core';
import {Http} from 'angular2/http'
import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {AuthService} from './services/auth/auth';
import {Type} from 'angular2/core';

@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {},
  providers: [
    provide(AuthHttp, {
      useFactory: (http) => {
        return new AuthHttp(new AuthConfig(), http);
      },
      deps: [Http]
    }),
    AuthService
  ]
})

...
```