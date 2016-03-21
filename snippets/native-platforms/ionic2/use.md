```js
// app/services/auth/auth.ts

import {Storage, LocalStorage} from 'ionic-framework/ionic';
import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class AuthService {
  jwtHelper: JwtHelper = new JwtHelper();
  lock: Auth0Lock = new Auth0Lock('<%= account.clientId %>', '<%= account.namespace %>');
  local: Storage = new Storage(LocalStorage);
  refreshSubscription: any;
  user: Object;
  
  constructor(private authHttp: AuthHttp) {
    // If there is a profile saved in local storage
    let profile = this.local.get('profile')._result;
    if (profile) {
      this.user = JSON.parse(profile);
    }
  }
  
  public authenticated() {
    // Check if there's an unexpired JWT
    return tokenNotExpired();
  }
  
  public login() {
    // Show the Auth0 Lock widget
    this.lock.show({
      authParams: {
        scope: 'openid offline_access',
        device: 'Mobile device'
      }
    }, (err, profile, token, accessToken, state, refreshToken) => {
      if (err) {
        alert(err);
      }
      // If authentication is successful, save the items
      // in local storage
      this.local.set('profile', JSON.stringify(profile));
      this.local.set('id_token', token);
      this.local.set('refresh_token', refreshToken);
      this.user = profile;
    });    
  }
  
  public logout() {
    this.local.remove('profile');
    this.local.remove('id_token');
    this.local.remove('refresh_token');
    this.user = null;
  }
}
```