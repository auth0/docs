<!-- markdownlint-disable MD002 MD041 -->

## Integrate Auth0 in your Application

Use the [Auth0 SPA SDK](https://github.com/auth0/auth0-spa-js) library to integrate Auth0 into your application. You can either install the library as a dependency in your application, or load it from CDN.

### Install as a dependency

You can install the Auth0 SPA SDK as a dependency of your application, useful if you're using a build system such as [Webpack](https://webpack.js.org/). You can do this using `npm` or `yarn`.

<% if (typeof v2 === 'undefined' || v2 === false) { %>
```bash
# installation with npm
npm install --save @auth0/auth0-spa-js

# installation with yarn
yarn add @auth0/auth0-spa-js
```
<% } else { %>
```bash
# installation with npm
npm install --save @auth0/auth0-spa-js@beta

# installation with yarn
yarn add @auth0/auth0-spa-js@beta
```
<% } %>

Once the Auth0 SPA SDK is installed, reference it using an import statement at the entrypoint of your application ():

<% if (typeof v2 === 'undefined' || v2 === false) { %>
```js
import createAuth0Client from '@auth0/auth0-spa-js';
```
<% } else { %>
```js
import { createAuth0Client } from '@auth0/auth0-spa-js';
```
<% } %>

### Reference the CDN
 
Alternatively, if you do not use a package manager such as Webpack, you can retrieve the Auth0 SPA SDK from Auth0's CDN.

<% if (typeof v2 === 'undefined' || v2 === false) { %>
```html
<script src="${auth0spajs_url}"></script>
```
<% } else { %>
```html
<script src="${auth0spajs_urlv2}"></script>
```
<% } %>

<%= include('../../../libraries/_includes/_spa_js_faq') %>
