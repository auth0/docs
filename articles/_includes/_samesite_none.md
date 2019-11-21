::: note
Previously, in Auth0, `sameSite` attribute options were listed as `true`, `false`, `strict` or `lax`. If you did not set the attribute, the default would be `false`. Now, we have also added the ability for you to set the attribute to `none`. Effective February 2020, Google Chrome (v80) will change its cookie handling. Two things are changing with this planned release:

* Cookies set without `sameSite` attribute will be defaulted to `lax` instead of the current implicit value `none`.

* Cookies set with `sameSite=none` must also be secure or they’ll be rejected to be saved in the browser’s cookie jar. 

The reason for this change is to improve default security and prevent CSRF attacks. For more information, see [sameSite Cookie Attributes](/sessions/concepts/cookie-attributes).
:::