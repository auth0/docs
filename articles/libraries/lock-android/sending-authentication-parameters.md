---
toc_title: Sending Authentication Parameters
description: Sending Authentication parameters with Lock Android
---

::: panel-info Version Warning
This document is not yet updated to use [Lock for Android](https://github.com/auth0/Lock.Android) 2.0. It will be soon!
:::

# Lock Android: Sending Authentication Parameters

You can specify additional authentication parameters, before starting `LockActivity` or when calling any API method using `APIClient`, by using `ParameterBuilder` object to build the parameter dictionary. By default `ParameterBuilder` has the parameter `scope` with `openid offline_access` and `device` with the name obtained from
```java
android.os.Build.MODEL
```
The following example adds a `scope` parameter with the value `login`.
```java
ParameterBuilder builder = ParameterBuilder.newBuilder();
Map<String, Object> parameters = builder.setScope("login").asDictionary();
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

```java
ParameterBuilder builder = ParameterBuilder.newBuilder();
Map<String, Object> parameters = builder
    .set("access_type", "offline")
    .set("my_arbitrary_param", "foo")
    .asDictionary();
```

## Supported parameters
### scope:`String`

There are different values supported for scope:

* `'openid'`: It will return, not only the `access_token`, but also an `id_token` which is a Json Web Token (JWT). The JWT will only contain the user id (sub claim). You can use constant `ParemterBuilder.SCOPE_OPENID`.
* `'openid profile'`: (not recommended): will return all the user attributes in the token. This can cause problems when sending or receiving tokens in URLs (e.g. when using response_type=token) and will likely create an unnecessarily large token(especially with Azure AD which returns a fairly long JWT). Keep in mind that JWTs are sent on every API request, so it is desirable to keep them as small as possible.
* `'openid {attr1} {attr2} {attrN}'`: If you want only specific user's attributes to be part of the `id_token` (For example: `scope: 'openid name email picture'`).

Also when need to keep the `id_token` alive, you can request a refresh_token adding to the scope the value `offline_access` (Or use the constant `ParameterBuilder.SCOPE_OFFLINE_ACCESS`).

By default in Lock for Android, the scope is set to `openid offline_access`.

### device:`String`

This value is only required when one of the scopes is `offline_access`. By default it has the name of the device obtained from calling the following method:

```java
android.os.Build.MODEL
```
