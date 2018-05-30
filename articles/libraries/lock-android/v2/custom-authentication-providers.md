---
section: libraries
title: Lock Android v2 Custom Authentication Providers
description: Implementing custom authentication providers
tags:
  - libraries
  - lock
  - android
---
# Lock Android: Custom Authentication Providers

**Auth0.Android** includes the `WebAuthProvider` class to handle the authorize flow using the Browser. But what if you want to use your own implementation or a Native version of an `AuthProvider`?

## The AuthProvider class

Create a class that implements the `AuthProvider` interface and override its methods.

You can also use any **Native** implementation already provided by Auth0. The [native social authentication](/libraries/lock-android/v2/native-social-authentication) providers currently available are Google and Facebook.

::: warning
The native social providers rely on a deprecated grant type. Applications created after June 8th 2017 won't be able to use this feature. We recommend using browser-based flows, as explained in [Authentication via Universal Login](/libraries/auth0-android#authentication-via-universal-login).
:::

## The AuthHandler class

**Auth0.Android** includes an interface for you to implement and define which provider to use given a Strategy and Connection name. It has a single method that returns an `AuthProvider` for a given strategy/connection name. If no provider can handle those values, it should return `null`. On **Lock** side, when no provider is returned it will default to `WebAuthProvider`.

```java
public interface AuthHandler {
 //Will return a nullable AuthProvider to handle that strategy/connection.
 @Nullable
 AuthProvider providerFor(@Nullable String strategy, @NonNull String connection);
}
```

### Usage Example

```java
public class MyAuthHandler implements AuthHandler {

  @Nullable
  @Override
  public AuthProvider providerFor(@Nullable String strategy, @NonNull String connection){
    AuthProvider provider = null;
    if ("linkedin".equals(strategy)) {
      provider = new MyLinkedInProvider();
    } else if ("twitter".equals(strategy)) {
      if (connection.equals("twitter-dev")) {
        provider = new TwitterDevProvider();
      } else {
        provider = new TwitterProvider();
      }
    }
    return provider;
  }
}
```

Finally, on the `Lock.Builder` class you need to set the AuthHandlers to use on that **Lock** instance.

```java
builder.withAuthHandlers(Arrays.asList(new MyAuthHandler()));
```

This way when **Lock** needs to authenticate a user with OAuth, it will ask the handlers **respecting the given order**, which of them can handle a given connection/strategy name. If the first one can handle it, the second won't be called. If no handlers can match the request (Lock received `null`), Lock will internally default to use `WebAuthProvider`. Also note that `strategy` can be null.

::: note
In this example we used `MyLinkedInProvider`, `TwitterDevProvider` and `TwitterProvider` classes **not** included in **Lock**.
:::

Our Google and Facebook [native social providers](/libraries/lock-android/v2/native-social-authentication) will provide `AuthHandler`s for you to use directly with **Lock**.
