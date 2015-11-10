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

  lock = new Auth0Lock('<%= account.clientId %>', '<%= account.namespace %>');

  constructor() {}

  login() {
    this.lock.show(function(err:string, profile:string, id_token:string) {

      if(err) {
        throw new Error(err);
      }

      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('id_token', id_token);

    });
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
  }

  loggedIn() {
    return tokenNotExpired();
  }

}
```
