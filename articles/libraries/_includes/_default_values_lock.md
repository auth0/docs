### Default values

Lock 11 will default the <dfn data-key="scope">scope</dfn> parameter to `'openid profile email'`. This is to make the **Last time you logged in with** window work correctly.

If you are running your website from `http://localhost` or `http://127.0.0.1` and you do not specify the `openid profile email` scope when initializing Lock, you may get the following error in the browser console:

```text
Consent required. When using `getSSOData`, the user has to be authenticated with the following scope: `openid profile email`
```

This will not happen when you run your application in production, or if you specify the required [scope](/scopes). You can read more about this scenario in the documentation on [skipping consent for first-party applications](/api-auth/user-consent#skipping-consent-for-first-party-applications).
