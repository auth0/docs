The previous step demonstrated how to add authentication to your app using the Lock widget. While Lock provides an easy to use, fully-featured, and customizable login interface, you may want to build your own UI with a custom design. To do this, use the [auth0.js library](https://github.com/auth0/auth0.js).

## Install auth0.js

The auth0.js library can either be retrieved from npm or from Auth0's CDN.

**npm**

```bash
npm install --save auth0-js
```

**CDN Link**

```html
<!-- index.html  -->

<script src="https://cdn.auth0.com/js/auth0/8.7/auth0.min.js"></script>
```