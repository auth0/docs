### Update Lock.js

You update the Lock.js library to integrate Auth0 into your application.

Install Lock.js using npm or yarn.

```bash
# installation with npm
npm install --save auth0-lock

# installation with yarn
yarn add auth0-lock
```

Once you install Lock.js, add it to your build system or bring it in to your project with a script tag.

```html
<script type="text/javascript" src="node_modules/auth0-lock/build/lock.js"></script>
```

If you do not want to use a package manager, you can retrieve auth0.js from Auth0's CDN.

```html
<script src="${lock_url}"></script>
```
