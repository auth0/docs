---
name: logout-button.ts
language: javascript
---

```javascript
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-logout-button',
  template: `
    <button (click)="logout()">
      Log out
    </button>
  `,
})
export class LogoutButtonComponent {
  constructor(
    @Inject(DOCUMENT) public document: Document,
    private auth: AuthService
  ) {}

  logout() {
    this.auth.logout({ 
      returnTo: this.document.location.origin 
    });
  }
}
```