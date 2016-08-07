---
title: User Profile
description: This tutorial will show you how to integrate Auth0 with Angular2 to authenticate and fetch/show profile information.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-angularjs2-systemjs-sample',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-angularjs2-systemjs-sample',
  pkgBranch: 'master',
  pkgPath: '04-User-Profile',
  pkgFilePath: null,
  pkgType: 'js'
}) %>

In this step, you will retrieve and display user profile information using the same `Auth` service defined in the [Login](/quickstart/spa/angular2/01-login) tutorial.

## Profile

To fetch user profile information, call the `lock.getProfile` function, specifying the `idToken` and a callback to process the response.

Once you retrieve the user profile, you can store it in `localStorage` (or any store) and assign it to a `userProfile` attribute so you can access it later.

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
    // Set userProfile attribute of already saved profile
    this.userProfile = JSON.parse(localStorage.getItem('profile'));

    // Add callback for the Lock `authenticated` event
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
To see user profile information, inject the `Auth` service in a component:

```typescript
/* ===== ./home.component.ts ===== */
export class HomeComponent {
  constructor(private auth: Auth) {}
}
```

Then display `userProfile` attributes in your component's template:

```html
/* ===== ./home.template.ts ===== */
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

## Custom Sign Up Fields

You can add input fields to the sign up form by adding `additionalSignUpFields` to the `options` parameter of the `Auth0Lock` instantiation. 

**NOTE:** See [Additional sign up fields](https://github.com/auth0/lock#additional-sign-up-fields) for more information.

```typescript
/* ===== ./auth.service.ts ===== */
...
  // Configure Auth0
  lock = new Auth0Lock('${account.clientId}', '${account.namespace}', {
    additionalSignUpFields: [{
      name: "address",                              // required
      placeholder: "enter your address",            // required
      icon: "https://example.com/address_icon.png", // optional
      validator: function(value) {                  // optional
        // only accept addresses with more than 10 characters
        return value.length > 10;
      }
    }]
  });
...
```

Each `additionalSignUpFields` value is saved to the profile in the `user_metadata` attribute.

To display this data, read it from the profile's `user_metadata`:

```html
/* ===== ./profile_show.template.html ===== */
<strong>Address: </strong> {{auth.userProfile.user_metadata.address}}
```

## Update User Profile

<%= include('../_includes/_profile-metadata-explanation') %>

You can add an `address` attribute to the user profile's `user_metadata` by creating a component and a simple form. You will need to call the [Update a user](/api/management/v2#!/Users/patch_users_by_id) endpoint on form-submit. 

To call the endpoint, you can use the [AuthHttp](https://github.com/auth0/angular2-jwt#sending-authenticated-requests) helper from `angular2-jwt` which provides the same interface as the `Http` module but automatically adds the authorization header to requests.

First, add `AUTH_PROVIDERS` from `angular-jwt`:

```typescript
/* ===== app/main.ts ===== */
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { AppComponent } from './app.component';

bootstrap(AppComponent, [
  ...
  AUTH_PROVIDERS,
  ...
])
```

Then import `AuthHttp`, inject it in your component, and use it to make the authenticated request. 

In this example, the `patch` method takes the endpoint URL, body, and headers:

```typescript
/* ===== app/edit_profile.component.ts ===== */
import { AuthHttp } from 'angular2-jwt';

@Component({
  selector: 'profile',
  templateUrl: 'app/profile_edit.template.html'
})

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

Then create a simple form template to add/update the *address* attribute:

```html
/* ===== app/profile_edit.template.html ===== */
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

