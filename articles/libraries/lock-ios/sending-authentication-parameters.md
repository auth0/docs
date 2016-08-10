---
toc_title: Sending Authentication Parameters
description:
---

# Lock iOS: Sending Authentication Parameters

You can send parameters, before displaying `A0AuthenticationViewController` or when calling any API method using `A0APIClient`, by adding them to a `A0AuthParameters` object. By default `A0AuthParameters` has the parameter `scope` with `openid offline_access` and `device` with the name obtained from calling
```objc
[[UIDevice currentDevice] name];
```
The following example adds a `scope` parameter with the value `login`.
```objc
A0AuthParameters *parameters = [A0AuthParameters newDefaultParams];
parameters.scope = @"login";
```

The following parameters are supported:
* `access_token`
* `scope`
* `protocol`
* `device`
* `connection_scopes`
* `nonce`
* `offline_mode`
* `state`.

There are other extra parameters that will depend on the provider. For example, Google allows you to get back a `refresh_token` only if you explicitly ask for `access_type=offline`.

We support sending arbitrary parameters like this:

```objc
A0AuthParameters *parameters = [A0AuthParameters newDefaultParams];
[parameters setValue:@"offline" forKey:@"access_type"];
[parameters setValue:@"foo" forKey:@"my_arbitrary_param"];
```

## Supported parameters
### scope:`NSString`

There are different values supported for scope:

* `'openid'`: It will return, not only the `access_token`, but also an `id_token` which is a Json Web Token (JWT). The JWT will only contain the user id (sub claim). You can use objc constant `A0ScopeOpenId`.
* `'openid profile'`:(not recommended): will return all the user attributes in the token. This can cause problems when sending or receiving tokens in URLs (e.g. when using response_type=token) and will likely create an unnecessarily large token(especially with Azure AD which returns a fairly long JWT). Keep in mind that JWTs are sent on every API request, so it is desirable to keep them as small as possible. You can use objc constant `A0ScopeProfile`.
* `'openid {attr1} {attr2} {attrN}'`: If you want only specific user's attributes to be part of the `id_token` (For example: `scope: 'openid name email picture'`).

Also when need to keep the `id_token` alive, you can request a refresh_token adding to the scope the value `offline_access` (Or use the constant `A0ScopeOfflineAccess`).

By default in Auth0.iOS, the scope is set to `openid offline_access`.

### device:`NSString`

This value is only required when one of the scopes is `offline_access`. By default it has the name of the device obtained from calling the following method:

```objc
[[UIDevice currentDevice] name];
```

### connection_scopes:`NSDictionary`

The `connection_scopes` parameter allows for dynamically specifying scopes on any connection. This is useful if you want to initially start with a set of scopes (defined on the dashboard), but later on request the user for extra permissions or attributes.

The object keys must be the names of the connections and the values must be arrays containing the scopes to request to append to the dashboard specified scopes. An example is shown below:

```objc
A0AuthParameters *parameters = [A0AuthParameters newDefaultParams];
parameter.connectionScopes = @{
  @"facebook": [@"public_profile", @"user_friends"],
  @"google-oauth2": [@"https://www.googleapis.com/auth/orkut"],
  // none for twitter
};
```

> The values for each scope are not transformed in any way. They must match exactly the values recognized by each identity provider.
