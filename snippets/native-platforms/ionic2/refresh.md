```js
// src/services/auth/auth.ts

...

public scheduleRefresh() {
  // If the user is authenticated, use the token stream
  // provided by angular2-jwt and flatMap the token

  let source = Observable.of(this.idToken).flatMap(
    token => {
      console.log('token here', token);
      // The delay to generate in this case is the difference
      // between the expiry time and the issued at time
      let jwtIat = this.jwtHelper.decodeToken(token).iat;
      let jwtExp = this.jwtHelper.decodeToken(token).exp;
      let iat = new Date(0);
      let exp = new Date(0);
      
      let delay = (exp.setUTCSeconds(jwtExp) - iat.setUTCSeconds(jwtIat));
      
      return Observable.interval(delay);
    });
    
  this.refreshSubscription = source.subscribe(() => {
    this.getNewJwt();
  });
}

public startupTokenRefresh() {
  // If the user is authenticated, use the token stream
  // provided by angular2-jwt and flatMap the token
  if (this.authenticated()) {
    let source = Observable.of(this.idToken).flatMap(
      token => {
        // Get the expiry time to generate
        // a delay in milliseconds
        let now: number = new Date().valueOf();
        let jwtExp: number = this.jwtHelper.decodeToken(token).exp;
        let exp: Date = new Date(0);
        exp.setUTCSeconds(jwtExp);
        let delay: number = exp.valueOf() - now;
        
        // Use the delay in a timer to
        // run the refresh at the proper time
        return Observable.timer(delay);
      });
    
      // Once the delay time from above is
      // reached, get a new JWT and schedule
      // additional refreshes
      source.subscribe(() => {
        this.getNewJwt();
        this.scheduleRefresh();
      });
  }
}

public unscheduleRefresh() {
  // Unsubscribe fromt the refresh
  if (this.refreshSubscription) {
    this.refreshSubscription.unsubscribe();
  }
}

public getNewJwt() {
  // Get a new JWT from Auth0 using the refresh token saved
  // in local storage
  this.storage.get('refresh_token').then(token => {
    this.auth0.refreshToken(token, (err, delegationRequest) => {
      if (err) {
        alert(err);
      }
      this.storage.set('id_token', delegationRequest.id_token);
      this.idToken = delegationRequest.id_token;
    });
  }).catch(error => {
    console.log(error);
  });
  
}

...  
```