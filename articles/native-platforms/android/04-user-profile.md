---
title: User Profile
description: This tutorial will show you how to use Lock10 to get the user's profile data.
---



This tutorial will show you how to use Lock10 to get the user's profile data in your android apps with Auth0.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* AndroidStudio 2.0
* Emulator - Nexus5X - Android 6.0 
  :::


### Before Starting

Be sure that you have completed the [Basic Login](01-login.md) and the [Session Handling](03-session-handling.md) Quickstarts.

### 1. Instantiate the Authentication Client

Your first step is instantiate the authentication API client. This will be used to request the user profile's data.

```java
AuthenticationAPIClient client = new AuthenticationAPIClient(
new Auth0(${account.clientId}, ${account.namespace}));
```

> It's suggested to add both the `Auth0DomainID` and `Auth0ClientID` to the `Strings.xml` file rather than hardcode them in the manifest. 

### 2. Request User Data

Use your previously stored credentials (in this example, stored in the Application Singleton) to request the data.

```java        client.tokenInfo(App.getInstance().getUserCredentials().getIdToken())
                .start(new BaseCallback<UserProfile>() {
                    @Override
                    public void onSuccess(UserProfile payload) { }

                    @Override
                    public void onFailure(Auth0Exception error) { }
                });
```                
        
### 3. Access the data inside the UserProfile

At this point, you already have access to the ``UserProfile``.
You can use this data wherever you need it.

Some examples are:

```java
payload.getName();
payload.getEmail();
payload.getPictureURL()
```

> Remember that you can't modify the UI inside the onSuccess() method, as it works in a second thread. To solve this, you can persist the data, create a task in the UI thread or create a handler to receive that information.

### Done!

This exercise was simple! Look forward for other tutorials of Lock10.

