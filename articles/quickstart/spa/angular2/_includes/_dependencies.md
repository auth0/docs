## Add the Dependencies

There are several ways to integrate Auth0 in your Angular 2 application. If you want to use either the hosted login page or build a custom login UI yourself, you will require the **auth0.js library**.

```bash
npm install --save auth0-js
```

If you want to embed Auth0's Lock widget directly in your application, you will require the Lock library.

```bash
npm install --save auth0-lock
```

The auth0.js library and Lock widget can also be retrieved from Auth0's CDN.

```html
<script src="https://cdn.auth0.com/js/auth0/8.4/auth0.min.js"></script>
<script src="https://cdn.auth0.com/js/lock/10.14/lock.min.js"></script>
```

To help with making calls to secured endpoints on your own resource server, install the **angular2-jwt** library.

```bash
npm install --save angular2-jwt
```
