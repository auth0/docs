<!-- markdownlint-disable MD002 MD041 -->

## Integrate Auth0 in your Application

### Loading auth0-spa-js

You need the `auth0-spa-js` library to integrate Auth0 into your application.
You can either install the library locally in your application or load it from CDN.

### Loading via dependencies

Install `auth0-spa-js` using npm or yarn.

```bash
# installation with npm
npm install --save @auth0/auth0-spa-js

# installation with yarn
yarn add @auth0/auth0-spa-js
```

Once `auth0-spa-js` is installed, reference it using an import statement (if you're using a build system such as [Webpack](https://webpack.js.org/)):

```js
import createAuth0Client from '@auth0/auth0-spa-js';
```

### Loading it from CDN
 
If you do not want to use a package manager, you can retrieve `auth0-spa-js` from Auth0's CDN.

```html
<script src="${auth0spajs_url}"></script>
```

<%= include('../../../libraries/_includes/_spa_js_faq') %>