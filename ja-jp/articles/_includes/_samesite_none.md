::: note
Previously in Auth0, the [`samesite` cookie attribute](/sessions/concepts/cookie-attributes) options were `true`, `false`, `strict` or `lax`. If you didn't set the attribute manually, Auth0 would use the default value of `false`.

Effective February 2020, Google Chrome v80 will change the way it handles cookies. To that end, Auth0 plans on implementing the following changes to how it handles cookies:

* Cookies without the `samesite` attribute set will be set to `lax`
* Cookies with `sameSite=none` must be secured, otherwise they cannot be saved in the browser's cookie jar

The goal of these changes are to improve security and help mitigate CSRF attacks.
:::
