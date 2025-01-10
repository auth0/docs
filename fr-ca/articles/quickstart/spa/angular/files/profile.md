---
name: user-profile.ts
language: javascript
---

```javascript
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-profile',
  template: `
    <ul *ngIf="auth.user$ | async as user">
      <li>{{ user.name }}</li>
      <li>{{ user.email }}</li>
    </ul>`,
  standalone: true
})
export class UserProfileComponent {
  constructor(public auth: AuthService) {}
}
```