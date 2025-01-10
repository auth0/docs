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
    this.auth
      .logout({ 
        logoutParams: {
          returnTo,
        },
        async openUrl(url: string) {
          await Browser.open({ url });
        } 
      })
      .subscribe();
  }
}
```