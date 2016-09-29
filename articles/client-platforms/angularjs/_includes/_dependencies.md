## Step 1: Install the Dependencies

The easiest way to add authentication to any app with Auth0 is to use the Lock widget. To use the Lock widget in your Angular 1.x apps, and to help manage authentication related tasks, you will need to install several libraries:

* auth0-lock
* angular-lock
* angular-jwt

**Installing Dependencies with npm**

```bash
npm install angular-lock angular-jwt
```

or,

**Installing Dependencies with Bower**

```bash
bower install auth0-lock angular-lock angular-jwt
```

Once installed, the scripts for these libraries can be included in your project.

**After Installation with npm**

```html
...

<script type="text/javascript" src="https://cdn.auth0.com/js/lock/10.2/lock.min.js"></script>
<script src="node_modules/angular-lock/dist/angular-lock.js"></script>
<script src="node_modules/angular-jwt/dist/angular-jwt.js"></script>

...
```

or,

**After Installation with Bower**

```html
...

<script src="bower_components/auth0-lock/build/lock.js"></script>
<script src="bower_components/angular-lock/dist/angular-lock.js"></script>
<script src="bower_components/angular-jwt/dist/angular-jwt.js"></script>

...
```

To ensure that the Lock widget displays properly on all devices, add a `meta` tag to set the `viewport`.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```