## Integrate Auth0 in your Application

### Install auth0.js

You need the auth0.js library to integrate Auth0 into your application.

Install auth0.js using npm or yarn.

```bash
# installation with npm
npm install --save auth0-js

# installation with yarn
yarn add auth0-js
```

Once you install auth0.js, add it to your build system or bring it in to your project with a script tag.

```html
<script type="text/javascript" src="node_modules/auth0-js/build/auth0.js"></script>
```

If you do not want to use a package manager, you can retrieve auth0.js from Auth0's CDN.

```html
<script src="${auth0js_url}"></script>
```
