---
name: login-button.ts
language: javascript
---

```javascript
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Browser } from '@capacitor/browser';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-login-button',
  template: `<ion-button (click)="login()">Login</ion-button>`,
})
export class LoginButtonComponent {
  constructor(public auth: AuthService) {}

  login() {
    this.auth
      .loginWithRedirect({
        async openUrl(url: string) {
          await Browser.open({ url, windowName: '_self' });
        }
      })
      .subscribe();
  }
}
```