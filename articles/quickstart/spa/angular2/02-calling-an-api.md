---
title: Calling an API
description: This tutorial demonstrates how to call a backend API using an access token.
budicon: 448
topics:
  - quickstarts
  - spa
  - angular
  - login
github:
    path: 02-Calling-an-API
contentType: tutorial
useCase: quickstart
---

<!-- markdownlint-disable MD006 MD002 MD041 -->

Most single-page apps use resources from data APIs. You may want to restrict access to those resources, so that only authenticated users with sufficient privileges can access them. Auth0 lets you manage access to these resources using [API Authorization](/api-auth).

This tutorial shows you how to create a simple API using [Express](https://expressjs.com) that serves resources protected by a middleware that looks for and validates access tokens. You will then see how to call this API using an access token granted by the Auth0 authorization server.

:::note
If you have been following [part 1 of this tutorial](/quickstart/spa/angular-beta/01-login), then the following steps can be completed within the same project.
:::

<%= include('../_includes/_calling_api_create_api') %>

<%= include('../_includes/_calling_api_create_backend.md') %>

:::note
If you are not logged in when viewing this tutorial, the sample above will show the `domain` and `audience` values as "YOUR_TENANT" and "YOUR_API_IDENTIFIER" respectively. These should be replaced with the values from your Auth0 application.
:::

Finally, modify `package.json` to add two new scripts `dev` and `server` that can be used to start the frontend and the backend API together:

```json
"scripts": {
  "ng": "ng",
  "start": "ng serve",
  "build": "ng build",
  "test": "ng test",
  "lint": "ng lint",
  "e2e": "ng e2e",
  "server": "node server.js",
  "dev": "npm-run-all --parallel start server"
},
```

To start the project for this sample, run the `dev` command from the terminal:

```bash
npm run dev
```

This will start both the backend API and the frontend application together.

### Set up a proxy to the backend API

In this example, the backend and the frontend apps run on two different ports. In order to call the API from the frontend application, the development server must be configured to proxy requests through to the backend API. This is so that the frontend application can make a request to `/api/external` and it will be correctly proxied through to the backend API at `http://localhost:3001/api/external`.

To do this, add a `proxy.conf.json` file to the root of the project and populate it with the following code:

```json
{
  "/api": {
    "target": "http://localhost:3001",
    "secure": false
  }
}
```

Finally, modify `angular.json` to include a reference to this proxy configuration file, by adding a new key called `proxyConfig` and `proxy.conf.json` as the value. Open `angular.json` and look for the `serve` node. Modify it to include a reference to the proxy config file:

```json
  "serve": {
    "builder": "@angular-devkit/build-angular:dev-server",
    "options": {
      "browserTarget": "login-demo:build",
      "proxyConfig": "proxy.conf.json"
    },
    "configurations": {
      "production": {
        "browserTarget": "login-demo:build:production"
      }
    }
  },
```

## Modify the AuthService Class

Modify the `src/app/auth.service.ts` file so that the `audience` value is configured:

```js
// Auth0 application configuration
config = {
  domain: "${account.namespace}",
  client_id: "${account.clientId}",
  redirect_uri: `<%= "${window.location.origin}" %>/callback`,
  audience: "${apiIdentifier}" // NEW - add in the audience value
};
```

This parameter tells the authorization server that your application would like to call the API with the identifier ${apiIdentifier} on the user's behalf. This will cause the authorization server to prompt the user for consent the next time they log in. It will also return an access token that can be used to call the API.

## Calling the API

Now create a new component that can be shown on the screen to allow the user to call the backend API:

```bash
ng generate component external-api
```

Open `src/app/external-api/external-api.component.html` and replace its contents with the following:

```html
<div>
  <button (click)="pingApi()">Ping API</button>

  <div>
    <div [ngClass]="{ show: hasResponse }">
      <h6 class="muted">Result</h6>
      <pre>
        <code>{{ responseJson }}</code>
      </pre>
    </div>
  </div>
</div>
```

The UI for this component is a simple button that invokes a call to the API. The results of the call are then displayed in the `code` element.

Next, create a new service that will be responsible for making API calls:

```bash
ng generate service api
```

Then open `src/app/api.service.ts` and replace its contents with the following:

```ts
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}

  async ping(): Promise<any> {
    const client = await this.authService.getAuth0Client();
    const token = await client.getTokenSilently();

    return this.httpClient
      .get('/api/external', {
        headers: {
          Authorization: `Bearer <%= "${token}" %>`
        }
      })
      .toPromise();
  }
}
```

All the endpoints that the API exposes can be added here. Right now, there is just one: the `ping` endpoint. The `ping()` method above retrieves the current access token from the `AuthService` instance and then uses `HttpClient` to make a GET request to the backend API, passing the access token inside the [Authorization header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization).

For `HttpClient` to work properly, the `HttpClientModule` must also be registered in the application. To add this, open `src/app/app.module.ts` and import the module at the top of the file:

```ts
// .. other imports

import { HttpClientModule } from '@angular/common/http';
```

Then, add the module to the list of imports as in the declaration of your `AppModule`:

 ```ts
@NgModule({
  declarations: [...],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule   // NEW - include HttpClientModule in the import list
  ],
  providers: [],
  bootstrap: [AppComponent]
})
 ```

Next, open `src/app/external-api/external-api.component.ts` and replace its contents with the following:

```js
import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-external-api',
  templateUrl: './external-api.component.html',
  styleUrls: ['./external-api.component.css']
})
export class ExternalApiComponent {
  responseJson: string;
  hasResponse = false;

  constructor(private apiService: ApiService) {}

  async pingApi() {
    const response = await this.apiService.ping();

    this.responseJson = JSON.stringify(response, null, 2).trim();
    this.hasResponse = true;
  }
}

```

This component imports the `ApiService` that was created in the previous step, and calls the `ping()` method on it when the **Ping API** button is clicked. The response from this call is then saved into a local property, and then ultimately displayed on the screen in JSON format.

With this in place, modify the application router so that this new page can be accessed. Open the `src/app/app-routing.module.ts` file and modify the routes list to include the new component for calling the API:

```js
// .. other imports

// NEW - import the ExternalApiComponent class
import { ExternalApiComponent } from './external-api/external-api.component';

const routes: Routes = [
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },

  // NEW - add a route to the External API component
  {
    path: 'external-api',
    component: ExternalApiComponent,
    canActivate: [AuthGuard]
  }
];
```

Note that the `external-api` route also makes use of the authentication guard. This prevents the route from being accessed by unauthenticated users.

Finally, add a link to the navigation bar so that the user may reach this new page. Open `src/app/navbar/navbar.component.html` and modify it to include a link to the `/external-api` route:

```html
<header>
  <button (click)="login()" *ngIf="!isAuthenticated">Log in</button>
  <button (click)="logout()" *ngIf="isAuthenticated">Log out</button>

  <!-- NEW - add a couple of router links to the home page, and to profile -->
  <a [routerLink]="['']">Home</a>&nbsp;
  <a [routerLink]="['profile']" *ngIf="isAuthenticated">Profile</a>&nbsp;
  <a [routerLink]="['external-api']" *ngIf="isAuthenticated">External API</a>
</header>
```

:::note
You may need to restart the application in order for the server changes to take effect. Press `Ctrl+C` in the terminal to stop the application, then run it again using `npm run dev`
:::

At this point, you should be able to run the application, browse to the External API page and click the **Ping API** button to initiate the API call. The results of that call should then be available in the browser.
