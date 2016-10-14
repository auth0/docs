---
title: Linking Accounts
description: This tutorial will show you how to integrate Auth0 with Angular 2 to link accounts.
budicon: 345
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-angularjs2-systemjs-sample',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-angularjs2-systemjs-sample',
  pkgBranch: 'master',
  pkgPath: '05-Linking-Accounts',
  pkgFilePath: '05-Linking-Accounts/app/auth.config.ts',
  pkgType: 'replace'
}) %>

<%= include('../../_includes/_linking_accounts') %>

```typescript
// app/auth.service.ts

...

// Lock instance to launch a login to obtain the secondary JWT
lockLink = new Auth0Lock('${account.clientId}', '${account.namespace}', {
  auth: {
    params: {
      state: "linking"
    }
  },
  allowedConnections: ['Username-Password-Authentication', 'facebook', 'google-oauth2'],
  languageDictionary: { // allows to override dictionary entries
    title: "Link with:"
  }
});

...
```

Then, when setting the callback for the `authenticated` event with the `on` method, you can determine which login has executed by checking the value of the `authResult.state` attribute:

```typescript
// app/auth.service.ts

...

// Add callback for lock `authenticated` event
this.lock.on("authenticated", (authResult) => {
  // Every lock instance listens to the same event, so you have to check if
  // it's not the linking login here.
  if(authResult.state != "linking"){
    localStorage.setItem('id_token', authResult.idToken);
    this.fetchProfile(authResult.idToken);
  }
});

// Add callback for lockLink `authenticated` event
this.lockLink.on("authenticated", (authResult) => {
  // Every lock instance listens to the same event, so you have to check if
  // it's the linking login here.
  if(authResult.state == "linking"){
    // If it's the linking login, then create the link through the API.
    this.doLinkAccounts(authResult.idToken);
  }
});
...
```

Now that the second login is handled, you will need to actually do the linking.

To call the API, [angular2-jwt](https://github.com/auth0/angular2-jwt) provides the `AuthHttp` helper which has the same interface  as the `Http` module but automatically adds the authorization header to requests.

First, add the `AUTH_PROVIDERS` from angular-jwt:

```typescript
/* ===== app/app.module.ts ===== */
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
      AppComponent
    ],
    providers: [
      ...
      AUTH_PROVIDERS,
      ...
    ],
    imports: [
      ...
    ],
    bootstrap: [AppComponent],
})
```

Then import `AuthHttp`, inject it into your component and use it to make the authenticated request:

```typescript
// app/auth.service.ts

@Injectable()
export class Auth {

  ...

  constructor(private authHttp: AuthHttp, private router: Router) {
    ...
  };

  public doLinkAccounts(accountToLinkJWT) {
    var headers: any = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var data: any = JSON.stringify({
      link_with: accountToLinkJWT
    });

    this.authHttp
      .post('https://' + '${account.namespace}' + '/api/v2/users/' + this.userProfile.user_id + '/identities', data, {headers: headers})
      .map(response => response.json())
      .subscribe(
        response => {
          console.log("accounts linked");
          this.fetchProfile(localStorage.getItem('id_token'));
          this.router.navigate(['/profile']);
        },
        error => alert(error.json().message)
      );
  }
}
```

The function takes the `id_token` of the account to link with and posts to the API, passing the `link_with` parameter with the JWT value in the body. Then it fetches the profile on success to check that the accounts are now linked.

Now to begin the link process, call the `show` method on `lockLink` instance:

```typescript
// app/auth.service.ts
public linkAccount() {
  this.lockLink.show();
}
```

## User Profile Linked Accounts Information

The user profile contains an array of identities which includes the profile information from linked providers.

To view a user's identities, access the [Users](${manage_url}/#/users) page on the Auth0 dashboard, select a user, and scroll down to `identities`.

This example shows a user with a linked Google account:

![User identities](/media/articles/users/user-identities-linked.png)

If you fetch the profile after linking accounts, this same information will be available.

You can display this information and provide an **Unlink** button:

```html
  <!-- app/profile_show.template.html -->
  <div *ngIf="auth.authenticated() && auth.userProfile">
    <div class="row">
      <div class="col-md-6">
        <h3>Profile</h3>
        <img [src]="auth.userProfile.picture" alt="" class="profile-img">
        <p><strong>Name: </strong> {{auth.userProfile.name}}</p>
        <p><strong>Email: </strong> {{auth.userProfile.email}}</p>
        <p><strong>Nickname: </strong> {{auth.userProfile.nickname}}</p>
        <p><strong>Created At: </strong> {{auth.userProfile.created_at}}</p>
        <p><strong>Updated At: </strong> {{auth.userProfile.updated_at}}</p>
        <div *ngIf="auth.linkedAccounts().length > 0" >
          <strong>Linked accounts: </strong>
          <ul>
            <li *ngFor="let identity of auth.linkedAccounts()">
              {{identity.connection}} ({{identity.profileData.name || identity.profileData.email }})
              <button class="btn btn-default btn-primary" (click)="unLinkAccount(identity)">unlink</button>
            </li>
          </ul>
        </div>
        <button class="btn btn-default btn-primary" (click)="linkAccount()">Link accounts</button>
      </div>
    </div>
  </div>
  <h4 *ngIf="!auth.authenticated()">You are not logged in, please click 'Log in' button to login</h4>
```

This calls the following `linkedAccounts` helper method to filter the primary identity:

```typescript
// auth.service.ts

public linkedAccounts() {
 return this.userProfile.identities.filter(identity => {
    return this.userProfile.user_id != identity.provider + '|' + identity.user_id
  });
}
```

## Unlinking Accounts

You can dissociate a linked account by calling the [Unlink a user account](/api/management/v2#!/Users/delete_provider_by_user_id) endpoint using the primary `user_id`, and the `provider` and `user_id` of the identity to unlink:

```typescript
// auth.service.ts

public unLinkAccount(identity) {
  var headers: any = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  this.authHttp
  .delete('https://' + '${account.namespace}' + '/api/v2/users/' + this.userProfile.user_id + '/identities/' + identity.provider + "/" + identity.user_id, {headers: headers})
    .map(response => response.json())
    .subscribe(
      response => {
        console.log("unlinked account");
        this.fetchProfile(localStorage.getItem('id_token'));
        this.router.navigate(['Profile']);
      },
      error => alert(error.json().message)
    );
}
```


