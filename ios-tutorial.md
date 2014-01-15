# Using Auth0 with iOS

This tutorial explains how to integrate Auth0 with a iOS App. `Auth0Client` helps you authenticate users with any [Auth0 supported identity provider](identityproviders).

## Tutorial

### 1. Install Auth0Client static library

1. Go to [Auth0.iOS repository in Github](https://github.com/auth0/Auth0.iOS) and click on __Download ZIP__
2. Decompress it and reference the `Auth0Client` static library to your project:
	* Go to your project in XCode
	* Right-click on the `Frameworks` folder and select ___Add Files to "Your Project Name"___
	* Select the `Auth0Client` folder, ensure that your project target is selected and press __Add__

### 2. Setting up the callback URL in Auth0

<div class="setup-callback">
<p>Go to the <b>Application Settings</b> section on Auth0 Admin app and make sure that <b>App Callbacks URLs</b> has the following value:</p>

<pre><code>https://@@account.namespace@@/mobile</pre></code>
</div>

### 3. Integration
There are three options to do the integration: 

1. Using the [Auth0 Login Widget](login-widget) inside a Web View (this is the simplest with only a few lines of code required).
2. Creating your own UI (more work, but higher control the UI and overall experience).
3. Using specific user name and password.

#### Option 1: Authentication using Login Widget

To start with, we'd recommend using the __Login Widget__. Here is a snippet of code to copy & paste on your project:

```objective-c
#import "Auth0Client.h"

Auth0Client *client = [Auth0Client auth0Client:@"@@account.namespace@@" 
								   clientId:@"@@account.clientId@@"];

[client loginAsync:self withCompletionHandler:^(BOOL authenticated) {
    if (!authenticated) {
        NSLog(@"Error authenticating");
    }
    else{            
        // * Use client.auth0User to do wonderful things, e.g.:
		// - get user email => [client.auth0User.Profile objectForKey:@"email"]
		// - get facebook/google/twitter/etc access token => [[[client.auth0User.Profile objectForKey:@"identities"] objectAtIndex:0] objectForKey:@"access_token"]
		// - get Windows Azure AD groups => [client.auth0User.Profile objectForKey:@"groups"]
		// - etc.
    }
}];
```

![](img/iOS-step1.png)

#### Option 2: Authentication with your own UI

If you know which identity provider you want to use, you can add a `connection` parameter to the constructor and the user will be sent straight to the specified `connection`:

```objective-c
[client loginAsync:self connection:@"auth0waadtests.onmicrosoft.com" withCompletionHandler:^(BOOL authenticated) 
{ 
	/* Use client.auth0User to do wonderful things */ 
}];
```

> connection names can be found on Auth0 dashboard. E.g.: `facebook`, `linkedin`, `somegoogleapps.com`, `saml-protocol-connection`, etc.

#### Option 3: Authentication with specific user name and password (only for providers that support this)

```objective-c
[client loginAsync:self connection:@"my-db-connection" 
						username:@"username"
						password:@"password"
						withCompletionHandler:^(BOOL authenticated) 
{ 
	/* Use client.auth0User to do wonderful things */ 
}];
```

#### Scope

Optionally you can specify the `scope` parameter. There are two possible values for scope today:

* __scope:@"openid"__ _(default)_ - It will return, not only the `access_token`, but also an `id_token` which is a Json Web Token (JWT). The JWT will only contain the user id.
* __scope:@"openid profile"__ - If you want the entire user profile to be part of the `id_token`.

## Accessing user information

The `auth0User` has the following properties:

* `Profile`: returns a `NSDictionary` object containing all available user attributes (e.g.: `[client.auth0User.Profile objectForKey:@"email"]`).
* `IdToken`: is a Json Web Token (JWT) containing the user attributes and it is signed with your client secret. This is useful to call your APIs and flow the user identity (or Windows Azure Mobile Services, see below).
* `Auth0AccessToken`: the `access_token` that can be used to access Auth0's API. You would use this for example to [link user accounts](link-accounts).

> If you want to use __Windows Azure Mobile Services__ (WAMS) you should create a WAMS app in Auth0 and set the Master Key that you can get on the Windows Azure portal. Then you have change your iOS App to use the client id and secret of the WAMS app just created and set the callback of the WAMS app to be `https://@@account.tenant@@.auth0.com/mobile`. Finally, you have to set the `MobileServiceAuthenticationToken` property of the `MobileServiceUser` with the `IdToken` property of `auth0User`.

**Congratulations!**
