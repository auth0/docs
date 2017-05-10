```js
// src/services/auth.service.ts

import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Injectable, NgZone } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Auth0Vars } from '../auth0-variables';

import Auth0Cordova from '@auth0/cordova';
import Auth0 from 'auth0-js';

const auth0Config = {
  // needed for auth0
  clientID: Auth0Vars.AUTH0_CLIENT_ID,

  // needed for auth0cordova
  clientId: Auth0Vars.AUTH0_CLIENT_ID,
  domain: Auth0Vars.AUTH0_DOMAIN,
  callbackURL: Auth0Vars.AUTH0_CALLBACK_URL,
  packageIdentifier: Auth0Vars.AUTH0_APPLICATION_PACKAGE_NAME
};


@Injectable()
export class AuthService {
  jwtHelper = new JwtHelper();
  auth0 = new Auth0.WebAuth(auth0Config);
  refreshSubscription$: Subscription;
  accessToken: string;
  idToken: string;
  user: any;

  constructor(public zone: NgZone) {
    this.user = this.getStorageVariable('profile');
    this.idToken = this.getStorageVariable('id_token');
  }

  private getStorageVariable(name) {
    return JSON.parse(window.localStorage.getItem(name));
  }

  private setStorageVariable(name, data) {
    window.localStorage.setItem(name, JSON.stringify(data));
  }

  private setIdToken(token) {
    this.idToken = token;
    this.setStorageVariable('id_token', token);
  }

  private setAccessToken(token) {
    this.accessToken = token;
    this.setStorageVariable('access_token', token);
  }

  public isAuthenticated() {
    return tokenNotExpired('id_token', this.idToken);
  }

  public login() {
    const client = new Auth0Cordova(auth0Config);

    const options = {
      scope: 'openid profile offline_access'
    };

    client.authorize(options, (err, authResult) => {
      if(err) {
        throw err;
      }

      this.setIdToken(authResult.idToken);
      this.setAccessToken(authResult.accessToken);
      this.setStorageVariable('refresh_token', authResult.refreshToken);

      this.auth0.client.userInfo(this.accessToken, (err, profile) => {
        if(err) {
          throw err;
        }

        profile.user_metadata = profile.user_metadata || {};
        this.setStorageVariable('profile', profile);
        this.zone.run(() => {
          this.user = profile;
        });
      });

      this.scheduleRefresh();
    });
  }

  public logout() {
    window.localStorage.removeItem('profile');
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('id_token');
    window.localStorage.removeItem('refresh_token');

    this.idToken = null;
    this.accessToken = null;
    this.user = null;

    this.unscheduleRefresh();
  }

  public scheduleRefresh() {
    let source = Observable.of(this.idToken).flatMap(
      token => {
        // The delay to generate in this case is the difference
        // between the expiry time and the issued at time
        let jwtIat = this.jwtHelper.decodeToken(token).iat;
        let jwtExp = this.jwtHelper.decodeToken(token).exp;
        let iat = new Date(0);
        let exp = new Date(0);

        let delay = (exp.setUTCSeconds(jwtExp) - iat.setUTCSeconds(jwtIat));

        return Observable.interval(delay);
      });

    this.refreshSubscription$ = source.subscribe(() => {
      this.getNewJwt();
    });
  }

  public unscheduleRefresh() {
    if(!this.refreshSubscription$) return;
    this.refreshSubscription$.unsubscribe();
  }

  public getNewJwt() {
    const token = this.getStorageVariable('refresh_token');

    this.auth0.refreshToken(token, (err, delegationRequest) => {
      if(err) {
        throw err;
      }

      this.setIdToken(delegationRequest.id_token);
    });
  }
}
```
