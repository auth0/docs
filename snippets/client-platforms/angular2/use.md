```js
// app.ts

@Component({
  directives: [ CORE_DIRECTIVES, NgIf ],
  selector: 'app',
  template: `
    <h1>Welcome to Angular2 with Auth0</h1>
    <button *ng-if="!loggedIn()" (click)="login()">Login</button>
    <button *ng-if="loggedIn()" (click)="logout()">Logout</button>
  `
})

export class AuthApp {

  auth: Auth0Service = new Auth0Service('<%= account.clientId %>', '<%= account.namespace %>');

  constructor() {}

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }

  loggedIn() {
    return tokenNotExpired();
  }

}
```
