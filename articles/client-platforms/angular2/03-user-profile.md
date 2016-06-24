---
title: User Profile
description: This tutorial will show you how to integrate Auth0 with Angular2 to authenticate and fetch/show profile information.
---

<%= include('../../_includes/_github', {
  link: 'https://github.com/auth0-samples/auth0-angularjs2-systemjs-sample/tree/master/03-User-Profile',
}) %>


#### Profile

To fetch user profile information, you have to call `lock.getProfile` function, specifying the token and a callback to process response.

You can do whatever you want with the profile. 
One option is to store it in `localStorage` (or any store you want) and also assign it to a `userProfile` attribute to access it from anywhere.

```typescript
/* ===== ./auth.service.ts ===== */
import {Injectable} from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {
  // Configure Auth0
  lock = new Auth0Lock('${account.clientId}', '${account.namespace}', {});

  //Store profile object in auth class
  userProfile: Object;

  constructor() {
    // Set userProfile attribute if already saved profile
    this.userProfile = JSON.parse(localStorage.getItem('profile'));

    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);

      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;
      });
    });
  };

  ...
  
  public logout() {
    // Remove token and profile from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.userProfile = undefined;
  };
}
```
To see user profile information, inject `Auth` service in a component:

```typescript
export class Home {
  constructor(private auth: Auth) {}
}
``` 

and then in your component's template:

```html
<div *ngIf="auth.authenticated() && auth.userProfile">
  <h4>You are logged in</h4>
  <div class="row">
    <div class="col-md-6">
      <h3>Profile</h3>
      <img [src]="auth.userProfile.picture" alt="" class="profile-img">
      <p><strong>Name: </strong> {{auth.userProfile.name}}</p>
      <p><strong>Email: </strong> {{auth.userProfile.email}}</p>
      <p><strong>Nickname: </strong> {{auth.userProfile.nickname}}</p>
      <p><strong>Created At: </strong> {{auth.userProfile.created_at}}</p>
      <p><strong>Updated At: </strong> {{auth.userProfile.updated_at}}</p>
    </div>
  </div>
</div>
<h4 *ngIf="!auth.authenticated()">You are not logged in, please click 'Log in' button to login</h4>
```

#### Custom Sign Up Fields

You can add input fields to the sign up form adding to the options parameter the `additionalSignUpFields`. See full documentation [here](link_to_additionalSignUpFields_doc).  

```typescript
  // Configure Auth0
  lock = new Auth0Lock('${account.clientId}', '${account.namespace}', {
    additionalSignUpFields: [{
      name: "address",                              // required
      placeholder: "enter your address",            // required
      icon: "https://example.com/address_icon.png", // optional
      validator: function(value) {                  // optional
        // only accept addresses with more than 10 chars
        return value.length > 10;
      }
    }]
  });
```
Each `additionalSignUpFields` value is saved into the profile in the `user_metadata` attribute.
To display, just read it from profile `user_metadata`:

```html
<strong>Address: </strong> {{auth.userProfile.user_metadata.address}}
```

#### Update user profile

To update user profile info, you need to hit [user api endpoint](https://auth0.com/docs/api/management/v2#!/Users/patch_users_by_id). To do that `angular-jwt` provides a `AuthHttp` class which automatically attach the user's JWT as an `Authorization` header when making requests. 
Making secure HTTP calls looks the same as it would with regular Http.

```typescript
// edit_profile.component.ts
import {AuthHttp} from 'angular2-jwt';

export class ProfileEdit {
  address: String
  constructor(private auth: Auth, private authHttp: AuthHttp, private router: Router) {
    if(auth.userProfile.user_metadata && auth.userProfile.user_metadata.address){
      this.address = auth.userProfile.user_metadata.address;
    }
  }

  onSubmit() {
    var headers: any = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var data: any = JSON.stringify({
      user_metadata: {
        address: this.address
      }
    });

    this.authHttp
      .patch('https://' + '${account.namespace}' + '/api/v2/users/' + this.auth.userProfile.user_id, data, {headers: headers})
      .map(response => response.json())
      .subscribe(
        response => {
        	//Update profile
          this.auth.userProfile = response;
          localStorage.setItem('profile', JSON.stringify(response));
          this.router.navigate(['/Profile']);
        },
        error => alert(error.json().message)
      );
  }
}
```

So just add a form to add/edit the attribute `address` in the `user_metadata`:

```html
//profile_edit.template.html
<div class="row">
  <div class="col-md-6">
    <h3>Profile</h3>
    <img [src]="auth.userProfile.picture" alt="" class="profile-img">
    <form (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="name">Address</label>
        <input type="text" class="form-control" [(ngModel)]="address" placeholder="Enter address">
      </div>
      <button type="submit" class="btn btn-default">Submit</button>
    </form>
  </div>
</div>
```