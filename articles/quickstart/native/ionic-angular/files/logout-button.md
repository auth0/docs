---
name: logout-button.ts
language: javascript
---

```javascript
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Browser } from '@capacitor/browser';
import { tap } from 'rxjs/operators';

// Build the URL to return back to your app after logout
const returnTo = `<%= "${config.appId}" %>://${account.namespace}/capacitor/<%= "${config.appId}" %>/callback`;

@Component({
  selector: 'app-logout-button',
  template: `<ion-button (click)="logout()">Log out</ion-button>`,
})
export class LogoutButtonComponent {
  // Import the AuthService module from the Auth0 Angular SDK
  constructor(public auth: AuthService) {}

   logout() {
    // Use the SDK to build the logout URL
    this.auth
      .buildLogoutUrl({ returnTo })
      .pipe(
        tap((url) => {
          // Call the logout fuction, but only log out locally
          this.auth.logout({ localOnly: true });
          // Redirect to Auth0 using the Browser plugin, to clear the user's session
          Browser.open({ url });
        })
      )
      .subscribe();
  }
}
```