## Install auth0.js

Integrating Auth0 in your application requires the **auth0.js** library. Install it using npm or yarn.

```bash
# installation with npm
npm install --save auth0-js

# installation with yarn
yarn add auth0-js
```

Once **auth0.js** is installed, add it to your build system or bring it in to your project with a script tag.

```html
<script type="text/javascript" src="node_modules/auth0-js/build/auth0.js"></script>
```

If you don't want to use a package manager, **auth0.js** can also be retrieved from Auth0's CDN.

```html
<script src="${auth0js_url}"></script>
```