---
section: libraries
description: Sending Authentication parameters with Lock Android
---

# Lock Android: Sending Authentication Parameters

You can specify additional authentication parameters, before starting `Lock` or when calling any API method using `auth0.android`'s `AuthenticationAPIClient`, by using `ParameterBuilder` object to build the parameter dictionary. By default `ParameterBuilder` has the parameter `scope` with `openid`.

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

Finally to include the parameters in the requests call:

* Using Lock:
```java
Auth0 auth0 = //create account
Lock lock = Lock.newBuilder(auth0, callback)
              .withAuthenticationParameters(parameters)
              //...
              .build(this);
```

* Using AuthenticationAPIClient:
```java
Auth0 auth0 = //create account
AuthenticationAPIClient client = new AuthenticationAPIClient(auth0);
client.login("me@auth0.com", "myp4zzw0RD", "db-connection")
.addAuthenticationParameters(parameters)
.start(...);
```
