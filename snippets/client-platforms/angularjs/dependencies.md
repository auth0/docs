Install the dependencies with Bower or npm.

**Bower**

```bash
bower install auth0-lock angular-lock angular-jwt
```

```html
<!-- index.html -->

...

<!-- Dependencies -->
<script src="bower_components/auth0-lock/build/lock.js"></script>
<script src="bower_components/angular-lock/dist/angular-lock.js"></script>
<script src="bower_components/angular-jwt/dist/angular-jwt.js"></script>

<!-- App Scripts -->
<script type="text/javascript" src="app.js"></script>
<script type="text/javascript" src="home/home.js"></script>
<script type="text/javascript" src="login/login.js"></script>

...
```

**npm**

```bash
npm install angular-lock angular-jwt
```

```html
<!-- index.html -->

...

<!-- Dependencies -->
<script type="text/javascript" src="${lock_url}"></script>
<script src="node_modules/angular-lock/dist/angular-lock.js"></script>
<script src="node_modules/angular-jwt/dist/angular-jwt.js"></script>

<!-- App Scripts -->
<script type="text/javascript" src="app.js"></script>
<script type="text/javascript" src="home/home.js"></script>
<script type="text/javascript" src="login/login.js"></script>

...
```
