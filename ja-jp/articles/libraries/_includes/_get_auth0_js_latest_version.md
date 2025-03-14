### Update auth0.js

Update the Auth0.js library using npm or yarn.

```bash
# installation with npm
npm install --save auth0-js

# installation with yarn
yarn add auth0-js
```

Once updated, you can add it to your build system or bring it in to your project with a script tag.

```html
<script type="text/javascript" src="node_modules/auth0-js/build/auth0.js"></script>
```

If you do not want to use a package manager, you can retrieve Auth0.js from Auth0's CDN.

```html
<script src="${auth0js_url}"></script>
```
