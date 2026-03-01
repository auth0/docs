### Default values

Auth0.js v9 will default the value of the <dfn data-key="scope">scope</dfn> parameter to `openid profile email`.

If you are running your website from `http://localhost` or `http://127.0.0.1` and you do not specify the `openid profile email` scope when initializing auth0.js, calling the `getSSOData()` method will result in the following error in the browser console:

```text
Consent required. When using `getSSOData`, the user has to be authenticated with the following scope: `openid profile email`
```

This will not happen when you run your application in production, or if you specify the required [scope](/scopes). You can read more about this scenario in the documentation on [skipping consent for first-party applications](/api-auth/user-consent#skipping-consent-for-first-party-applications).
