```js
// app.ts

@Component({
  selector: 'public-route'
})
@View({
  template: `<h1>Hello from a public route</h1>`
})
class PublicRoute {}

@Component({
  selector: 'private-route'
})

@View({
  template: `<h1>Hello from private route</h1>`
})

@CanActivate(() => tokenNotExpired())

class PrivateRoute {}

@Component({
  directives: [ ROUTER_DIRECTIVES ],
  selector: 'app',
  template: `
    <h1>Welcome to Angular2 with Auth0</h1>
    <button *ngIf="!loggedIn()" (click)="login()">Login</button>
    <button *ngIf="loggedIn()" (click)="logout()">Logout</button>
    <hr>
    <div>
      <button [routerLink]="['./PublicRoute']">Public Route</button>
      <button *ngIf="loggedIn()" [routerLink]="['./PrivateRoute']">Private Route</button>
      <router-outlet></router-outlet>
    </div>

  `
})

@RouteConfig([
  { path: '/public-route', component: PublicRoute, as: 'PublicRoute' }
  { path: '/private-route', component: PrivateRoute, as: 'PrivateRoute' }
])

export class AuthApp {

...

}

bootstrap(AuthApp, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS, 
  provide(AuthHttp, { useFactory: () => {
    return new AuthHttp();
  }}),
  provide(APP_BASE_HREF, {useValue:'/'})
])
```