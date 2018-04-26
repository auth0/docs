```html
<!-- src/nav-bar.html -->

<ul class="nav navbar-nav pull-right">
  <li click.delegate="auth.login()" if.bind="!authenticated">
    <a>Log In</a>
  </li>
  <li click.delegate="auth.logout()" if.bind="authenticated">
    <a>Log Out</a>
  </li>
</ul>
```

```js
// src/app.js

import { PLATFORM } from 'aurelia-pal';
import { inject } from 'aurelia-framework';
import { AuthService } from './auth-service';

@inject(AuthService)
export class App {
  constructor(AuthService) {
    this.auth = AuthService;
    this.authenticated = this.auth.isAuthenticated();
    this.auth.authNotifier.on('authChange', authState => {
      this.authenticated = authState.authenticated;
    });
  }
}
```