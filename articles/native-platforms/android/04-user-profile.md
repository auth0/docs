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

### 1. Request User Data

Your first step is instantiate the authentication API client. This will be used to request the user profile's data.

```java
AuthenticationAPIClient client = new AuthenticationAPIClient(
new Auth0(${account.clientId}, ${account.namespace}));
```

> It's suggested to add both the `Auth0DomainID` and `Auth0ClientID` to the `Strings.xml` file rather than hardcode them in the manifest. 


Then, use your previously stored credentials (in this example, stored in the Application Singleton) to request the data.

```java        
client.tokenInfo(App.getInstance().getUserCredentials().getIdToken())
                .start(new BaseCallback<UserProfile>() {
	@Override
	public void onSuccess(UserProfile payload){
	}

	@Override
	public void onFailure(Auth0Exception error){
	}
});
```                
        
### 2. Access the data inside the UserProfile

##### I. DEFAULT INFO

At this point, you already have access to the ``UserProfile``.
You can use this data wherever you need it.

Some examples are:

```java
payload.getName();
payload.getEmail();
payload.getPictureURL()
```

> Remember that you can't modify the UI inside the onSuccess() method, as it works in a second thread. To solve this, you can persist the data, create a task in the UI thread or create a handler to receive that information.

##### I. ADDITIONAL INFO

Besides the defaults, you can handle more information that is contained within any of the following `map`:

##### A. USER METADATA

The userMetadata `map` contains fields related to the user profile that can be added from client-side (e.g. when editing the profile). We're going to edit this one in this tutorial. You can access its fields as follows:

```java
String country = payload.getUserMetadata().get("country").toString();
bool active = payload.getUserMetadata().get("active");
```

> The strings you use for subscripting the userMetadata dictionary, and the variable types you handle, are up to you.

##### B. APP METADATA

The appMetadata `map` contains fields that are usually added via a rule, which is read-only for the native platform.

##### C. EXTRA INFO

The extraInfo `map` contains any other extra information stored in Auth0. That information is read-only for the native platform.

> For further information on metadata, see the full documentation.


### 2. Update the User Profile

You can only update the user metadata. In order to do so you must:
Create a `Map<String, Object>` and add the new metadata:

```java
Map<String, Object> userMetadata = new HashMap<>();
        userMetadata.put("country", "USA");
```
And then, with the `UserApiClient` perform the update:

```java
UsersAPIClient userClient = new UsersAPIClient(mAuth0, App.getInstance().getUserCredentials().getIdToken());
userClient.updateMetadata(mUserProfile.getId(), userMetadata).start(new BaseCallback<UserProfile, ManagementException>() {
	@Override
	public void onSuccess(final UserProfile payload) {
	// As receive the updated profile here
	// You can react to this, and show the information to the user.
	}

	@Override
	public void onFailure(ManagementException error) {

	}
        });
```

### Done!

This exercise was simple! Look forward for other tutorials of Lock v2.

