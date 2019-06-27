---
title: Lock Android v1 Sending Authentication Parameters
description: Sending Authentication parameters with Lock Android
topics:
  - libraries
  - lock
  - android
contentType:
  - how-to
  - reference
useCase:
  - add-login
  - enable-mobile-auth
---
# Lock Android: Sending Authentication Parameters

<%= include('../_includes/_lock-version') %>

You can specify additional authentication parameters, before starting `LockActivity` or when calling any API method using `APIClient`, by using `ParameterBuilder` object to build the parameter dictionary. By default `ParameterBuilder` has the parameter <dfn data-key="scope">`scope`</dfn> with `openid offline_access` and `device` with the name obtained from

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
* <dfn data-key="nonce">`nonce`</dfn>
* `offline_mode`
* `state`.

There are other extra parameters that will depend on the provider. For example, Google allows you to get back a <dfn data-key="refresh-token">Refresh Token</dfn> only if you explicitly ask for `access_type=offline`.

We support sending arbitrary parameters like this:

```java
ParameterBuilder builder = ParameterBuilder.newBuilder();
Map<String, Object> parameters = builder
    .set("access_type", "offline")
    .set("my_arbitrary_param", "foo")
    .asDictionary();
```

## Supported Parameters

### scope:`String`

There are different values supported for scope:

* `'openid'`: It will return, not only the <dfn data-key="access-token">Access Token</dfn>, but also an ID Token which is a <dfn data-key="json-web-token">JSON Web Token (JWT)</dfn>. The JWT will only contain the user id (sub claim). You can use constant `ParameterBuilder.SCOPE_OPENID`.
* `'openid profile'`: (not recommended): will return all the user attributes in the token. This can cause problems when sending or receiving tokens in URLs (such as when using response_type=token) and will likely create an unnecessarily large token (especially with Azure AD which returns a fairly long JWT). Keep in mind that JWTs are sent on every API request, so it is desirable to keep them as small as possible.
* `'openid {attr1} {attr2} {attrN}'`: If you want only specific user's attributes to be part of the ID Token (for example: `scope: 'openid name email picture'`).

Also when you need to keep the ID Token alive, you can request a Refresh Token adding to the scope the value `offline_access` (Or use the constant `ParameterBuilder.SCOPE_OFFLINE_ACCESS`).

By default in Lock for Android, the scope is set to `openid offline_access`.

### device:`String`

This value is only required when one of the scopes is `offline_access`. By default it has the name of the device obtained from calling the following method:

```java
android.os.Build.MODEL
```
