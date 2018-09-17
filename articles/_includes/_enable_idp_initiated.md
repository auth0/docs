If you are using [Auth0.js](/libraries/auth0js), you have to update the **webAuth.parseHash** of the [library](/libraries/auth0js/v9#extract-the-authresult-and-get-user-info) and set the flag **__enableIdPInitiatedLogin** to `true`.

```javascript
var data = webAuth.parseHash(
  {
    ...
    __enableIdPInitiatedLogin: true
    ...
  }
```

If you're using [Lock](/lock), you can include the flag using the options parameter sent to the constructor.

```javascript
const lock = new Auth0Lock(clientID, domain, options)
```

Here's the flag itself:

```javascript
var options = {
    _enableIdPInitiatedLogin: true
};
```

Note that the **enableIdPInitiatedLogin** flag is preceded by **one** underscore when used with Lock and **two** underscores when used with the auth0.js library.
