---
name: user-profile.ts
language: javascript
---

```javascript
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-profile',
  template: `
  <div *ngIf="auth.user$ | async as user">
    <ion-avatar class="avatar">
      <img [src]="user.picture" [alt]="user.name" />
    </ion-avatar>
    <h2>{{ user.name }}</h2>
    <p>{{ user.email }}</p>
  </div>`,
})
export class ProfileComponent {
  constructor(public auth: AuthService) {}
}
```