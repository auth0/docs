---
title: Linking Accounts
description: This tutorial will show you how to integrate Auth0 with Angular2 to link accounts.
---

<%= include('../../_includes/_github', {
  link: 'https://github.com/auth0-samples/auth0-angularjs2-systemjs-sample/tree/master/05-Linking-Accounts',
}) %>_

In some cases, there could be need for you to link multiple accounts. One very common situation is when a user signed up with email and password which provides very little information about the user. You can urge the user to link their account to an OAuth provider like Facebook or Google.

## Linking Accounts

To link accounts you need to hit the [link user account endpoint](/api/management/v2#!/Users/post_identities). You need the primary JWT (the token saved when you login), the user id (could be taken from the JWT or the profile) and the JWT of the account you want to link (secondary account).

Let's make it work. As you need to do a second login to get the secondary account JWT, we will use another instance of `AuthLock`. This is to differentiate the login from the linking login.

As all instances listen to the `authenticated` event (we are in redirect mode, so we don’t have a reliable way to determine which instance did the login) we need a way to know if the login came from a login or from a linking login. We can use [params auth option](https://github.com/auth0/lock/tree/v10.0.0#authentication-options), setting a `state` property to `"linking"`.

```typescript
/* ===== app/auth.service.ts ===== */
...
// Lock instance to lauch a login to obtain the secondary JWT
lockLink = new Auth0Lock('${account.clientId}', '${account.namespace}', {
    auth: {params: {state: "linking"}},
    allowedConnections: ['Username-Password-Authentication', 'facebook', 'google-oauth2'],
    languageDictionary: { // allows to override dictionary entries
      title: "Link with:"
    }
  });
...
```

Then, when setting the `authenticated` callbacks we can know which login is, checking the `authResult.state` attribute.

```typescript
/* ===== app/auth.service.ts ===== */
...
// Add callback for lock `authenticated` event
this.lock.on("authenticated", (authResult) => {
  // Every lock instance listen to the same event, so we have to check if
  // it's not the linking login here.
  if(authResult.state != "linking"){
    localStorage.setItem('id_token', authResult.idToken);
    this.fetchProfile(authResult.idToken);
  }
});

// Add callback for lockLink `authenticated` event
this.lockLink.on("authenticated", (authResult) => {
  // Every lock instance listen to the same event, so we have to check if
  // it's the linking login here.
  if(authResult.state == "linking"){
    // If it's the linking login, then do the link through the API.
    this.doLinkAccounts(authResult.idToken);
  }
});
...
```

Now that we already have the second login handled let's see how to actually do the linking.
To call the api, [angular2-jwt](https://github.com/auth0/angular2-jwt) provides the `AuthHttp` helper which has the same `Http` module interface but automatically add the authorization header to the requests.

First you need to add the AUTH_PROVIDERS from angular-jwt

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

Then you can import `AuthHttp`, inject it in your component and use it to make the authenticated request:


```typescript
/* ===== app/auth.service.ts ===== */
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

The method takes the token of the account to link with, so we just make a post to the api, passing in the body a `link_with` parameter with the JWT value.
We fetched the profile on success and we can see that the accounts are now linked.


To make everything works just call `show` method on `lockLink` instance:

```typescript
/* ===== app/auth.service.ts ===== */
public linkAccount() {
  this.lockLink.show();
}
```

## User profile linked accounts information

User's profile contains an array of identities which is made of profile information from other providers. You can see this by accessing the [Auth0 users page](${uiURL}/#/users), select a user and scroll down to the identities. This is what it looks like after linking Gmail:

![User identities](/media/articles/users/user-identities-linked.png)

So if you fetch the profile after linking the accounts, you will have the same information there. Let's show this information:

```html
/* ===== app/profile_show.template.html ===== */
<div *ngIf="auth.linkedAccounts().length > 0" >
  <strong>Linked accounts: </strong>
  <ul>
    <li *ngFor="let identity of auth.linkedAccounts()">
      {{identity.connection}} ({{identity.profileData.name}})
      <button class="btn btn-default btn-primary" (click)="unLinkAccount(identity)">unlink</button>
    </li>
  </ul>
</div>
```

We are using a helper method to filter the primary identity:

```typescript
/* ===== ./auth.service.ts ===== */
public linkedAccounts() {
 return this.userProfile.identities.filter(identity => {
    return this.userProfile.user_id != identity.provider + '|' + identity.user_id
  })
}
```

## Un-Linking Accounts

You can also dissociate a linked account just hitting the [unlink user account endpoint](/api/management/v2#!/Users/delete_provider_by_user_id), using the primary user_id, and the provider/user_id of the identity you want to unlink.

```typescript
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

## Done!

You have implemented of linking and unlinking accounts in Auth0 user profile.
