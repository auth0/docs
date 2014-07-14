---

## 2. Calling an API with a JSON Web Token

> **IMPORTANT**: when a user is logged in to your application, you will have a `JWT` signed with the **application's secret**. The tutorial above is assuming you are using the **API's secret**, not the application's. Hence, the validation check will fail because these are two different tokens. 
You have two options: (a) use the same client id and secret for both your application and the API, or (b) use the `/delegation` endpoint to obtain a new token signed with the **API's secret**. Using different secrets for applications and APIs means less risk, because you are explicitly separating the boundaries of each system, and being explicit about your intent.

### <span class="icon icon-budicon-374" style="font-size: 16px;"></span> Single Page Applications / HTML5 JavaScript Front End

The `JWT` is available on the location hash of the browser as the `id_token` parameter. You probably want to store it in local/session storage or a cookie `auth0.getProfile(location.hash, ...)`. <a href="singlepageapp-tutorial" target="_new">Read more...</a>

### <span class="icon icon-budicon-243" style="font-size: 16px;"></span> Native Mobile Applications

The `JWT` is available after login. Each native SDK should return a `user` containing the token as a property. For instance, on iOS, you would use `client.auth0User.IdToken`. <a href="nativeapps" target="_new">Read more...</a>

### <span class="icon icon-budicon-661" style="font-size: 16px;"></span> Web Applications (Server Side w/Cookies)

The `JWT` is available on the response when exchanging the `code`. Typically this is handled by the SDK. For instance, in ASP.NET you would do `ClaimsPrincipal.Current.Claims.FindFirst("id_token")`.

### <span class="icon icon-budicon-280" style="font-size: 16px;"></span> Programmatic Authentication (Service Accounts)

A `JWT` can be obtained authenticating with a user from a Database or AD/LDAP connection by calling the `oauth/ro` endpoint of the Authentication API, passing a username, password, connection and client_id. This can be used to obtain tokens from any system without user intervention (e.g. scripts, batch files, web backends, native apps). Look under **SDK - Authentication API - Database & Active Directory / LDAP Authentication** (on the dashboard).

### <span class="icon icon-budicon-292" style="font-size: 16px;"></span> Delegated Authentication

You can exchange an existing `JWT` with a new one that will be signed with the secret of the target API. This is typically used for identity delegation (i.e. user logged in to an application with a token signed for that application, then he calls an API which is protected with a different secret). Look under **SDK - Authentication API - Delegation** (on the dashboard).

> By default, all your clients will be allowed to make delegation requests. If you want to specify only some of them, please go to <a href="@@uiAppSettingsURL@@" target="_new">Apps / APIs Settings</a> - Allowed Applications / APIs** (on the dashboard).

Once you get the token, you can call the API attaching the `JWT` on the `Authorization` header.

    Authorization: Bearer ...JWT...
