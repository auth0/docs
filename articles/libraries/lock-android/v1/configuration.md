---
toc: true
title: Lock for Android v1 Configuration
description: Configuration options and methods for Lock for Android v1
tags:
  - libraries
  - lock
  - android
---
# Lock Android: Configuration

<%= include('../_includes/_lock-version') %>

These are options that can be used to configure Lock for Android v1 to your project's needs.

## Lock

### Lock Constants

```java
public static final String AUTHENTICATION_ACTION;
```

Action sent in `LocalBroadcastManager` when a user authenticates. It will include an instance of `UserProfile` and `Token`.

```java
public static final String AUTHENTICATION_ACTION_PROFILE_PARAMETER;
```

Name of the parameter that will include user's profile

```java
public static final String AUTHENTICATION_ACTION_TOKEN_PARAMETER;
```

Name of the parameter that will include user's token information

```java
public static final String CANCEL_ACTION;
```

Action sent when the user navigates back closing `LockActivity` or `LockSMSActivity`

```java
public static final String CANCEL_ACTION;
```

Action sent when the user change its password

### Lock Properties

```java
public boolean shouldUseWebView();
public void setUseWebView(boolean useWebView);
```

Forces Lock to use an embedded `android.webkit.WebView` and by default is `false`.

```java
public boolean shouldLoginAfterSignUp();
public boolean setLoginAfterSignUp(boolean loginAfterSignUp);
```

Lock will login the user after a successful sign up. By default is `true`

```java
public boolean isClosable();
public boolean setClosable(boolean closable);
```

Allows Lock activities to be closed by pressing back button. Default is `false`

```java
public boolean shouldUseEmail();
public void setUseEmail(boolean useEmail);
```

Lock will ask for the user's email instead of a username. By default is `true`.

```java
public Map<String, Object> getAuthenticationParameters();
public void setAuthenticationParameters(Map<String, Object> authenticationParameters);
```

Map with parameters that will be sent on every authentication request with Auth0 API.

```java
public List<String> getConnections();
public void setConnections(List<String> connections);
```

Tells Lock to use the connections whose name is included in the list. By default the list is null or empty which means that all enabled connections in your application will be used.

```java
public String getDefaultDatabaseConnection();
public void setDefaultDatabaseConnection(String defaultDatabaseConnection);
```

Lock will use the Database Connection whose name matches the one provided. By default its null, which means it will pick the first of the list.

```java
public void setFullscreen(boolean fullscreen);
public boolean isFullscreen();
```

If Lock's activities should be displayed in Fullscreen. Default is `false`

### Lock Methods

```java
public void setProvider(String serviceName, IdentityProvider provider);
```

Change the default identity provider handler for Social and Enterprise connections. By default all social/enterprise authentication are done using Web flow with a Browser.

```java
public void resetAllProviders();
```

Removes all session information the Identity Provider handlers might have.

## Lock.Builder

A simple builder to help you create and configure Lock in your application.

### Lock.Builder Constants

```java
public static final String CLIENT_ID_KEY = "com.auth0.lock.client-id";
```

Key value used by Lock to search in your application's meta-data for the ClientID.

```java
public static final String TENANT_KEY = "com.auth0.lock.tenant";
```

Key value used by Lock to search in your application's meta-data for tenant name.

```java
public static final String DOMAIN_URL_KEY = "com.auth0.lock.domain-url";
```

Key value used by Lock to search in your application's meta-data for domain Url.

```java
public static final String CONFIGURATION_URL_KEY = "com.auth0.lock.configuration-url";
```

Key value used by Lock to search in your application's meta-data for configuration Url.

### Lock.Builder Methods

```java
public Builder clientId(String clientId);
```

Set the clientId of your application in Auth0. This value is mandatory.

```java
public Builder tenant(String tenant);
```

Set the tenant name of your application. This value is optional if you supply a domain url.

```java
public Builder domainUrl(String domain);
```

Set the domain Url for Auth0's API. This value is optional if you provide a tenant name, it will default to Auth0 cloud API `https://tenant_name.auth0.com`.

```java
public Builder configurationUrl(String configuration);
```

Set the Url where Lock fetches the App configuration. By default it asks Auth0 for this info.

```java
public Builder useWebView(boolean useWebView);
```

Make Lock use an embedded WebView for Social+Enterprise authentications.

```java
public Builder closable(boolean closable);
```

Allow the user to close Lock's activity by pressing back button.

```java
public Builder loginAfterSignUp(boolean loginAfterSignUp);
```

After a successful sign up of a user, sign him/her in too.

```java
public Builder authenticationParameters(Map<String, Object> parameters);
```

Extra parameters sent to Auth0 Auth API during authentication. By default it has `scope` defined as `openid offline_access` and a device name stored in `device` parameter key.  For more information check out our [documentation on sending authentication parameters](/libraries/lock-android/v1/sending-authentication-parameters)

```java
public Builder useEmail(boolean useEmail);
```

Lock will ask for an email for authentication, otherwise it will ask for a username. By default is `true`.

```java
public Builder useConnections(String ...connectionNames);
```

Make Lock pick these connections for authentication from all the enabled connections in your app.

```java
public Builder defaultDatabaseConnection(String name);
```

Make Lock use the Database Connection whose name matches the one provided.

```java
public Builder loadFromApplication(Application application);
```

Load ClientID, Tenant name, Domain and configuration URLs from the Android app's metadata (if available).
These are the values that can be defined and it's keys:

* __com.auth0.lock.client-id__: Application's clientId in Auth0.
* __com.auth0.lock.tenant__: Application's owner tenant name. (Optional if you supply Domain and Configuration URLs)
* __com.auth0.lock.domain-url__: URL where the Auth0 API is available. (Optional if you supply ClientID/Tenant and you use Auth0 in the cloud)
* __com.auth0.lock.configuration-url__: URL where Auth0 apps information is available. (Optional if you supply ClientID/Tenant and you use Auth0 in the cloud)

```java
public Builder fullscreen(boolean fullscreen);
```

Make Lock's activities fullscreen. Default is `false`

```java
public Lock build();
```

Creates a new instance of `Lock` and configure it with the values passed to the builder.