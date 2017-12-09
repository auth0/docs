### Default Values

Lock 11 will default the `scope` parameter to `'openid profile email'`. This is to make the "Last time you logged in with" window work correctly.

If you don't specify that scope when initializing Lock, and you are running your website from http://localhost or http://127.0.0.1, you will get the following error in the browser console:

```text
Consent required. When using `getSSOData`, the user has to be authenticated with the following scope: `openid profile email`
```

That will not happen when you run your application in production or if you specify the required scope.


