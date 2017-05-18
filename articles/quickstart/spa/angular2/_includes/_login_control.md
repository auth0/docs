## Provide a Login Control

Provide a template with controls for the user to log in and log out.

```html
<!-- src/app/app.component.html -->

<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">Auth0 - Angular</a>

      <button
        class="btn btn-primary btn-margin"
        routerLink="/">
          Home
      </button>

      <button
        class="btn btn-primary btn-margin"
        *ngIf="!auth.isAuthenticated()"
        (click)="auth.login()">
          Log In
      </button>

      <button
        class="btn btn-primary btn-margin"
        *ngIf="auth.isAuthenticated()"
        (click)="auth.logout()">
          Log Out
      </button>

    </div>
  </div>
</nav>

<main class="container">
  <router-outlet></router-outlet>
</main>
```

::: note
This example uses Bootstrap styles, but that's unimportant. Use whichever style library you like, or don't use one at all.
:::

The `click` events on the **Log In** and **Log Out** buttons make the appropriate calls to the `AuthService` to allow the user to log in and log out. Notice that these buttons are conditionally hidden and shown depending on whether or not the user is currently authenticated.

<% if (${type} == 'centralized-login') { %>

  When the **Log In** button is clicked, the user will be redirected to Auth0's centralized login page.

<% } else { %>

  When the **Log In** button is clicked, the Lock widget will be opened.

<% } %>

![centralized login](/media/articles/web/${type}.png)
