---
title: Add Facebook Login to Native Apps
description: Learn how to add login functionality to your native app with Facebook. 
topics:
  - authentication
  - connections
  - social
  - facebook
contentType: how-to
useCase:
  - add-login
  - customize-connections
  - add-idp
---
# Add Facebook Login to Native Apps

You can add functionality to your native application to allow your users to authenticate using Facebook natively, within the application. This does not require redirection via a web browser.

## How it works

The Native Facebook login flow works as follows:

* **Step 1**: The application authenticates a user via the Facebook SDK and acquires an Access Token.
* **Step 2**: The application uses that Access Token to request a special [Facebook Session Info Access Token](https://developers.facebook.com/docs/facebook-login/access-tokens/session-info-access-token).
* **Step 3**: The application can then use the Facebook Session Info token to request a user profile from Auth0.

## Prerequisites

Before you configure Native Facebook login for your native app via Auth0, you must:

1. [Set up your application](/connections/social/facebook) with Facebook and as an Auth0 connection
1. [Use the relevant Facebook SDK in your application](https://developers.facebook.com/docs/apis-and-sdks/)
1. Create an application with Auth0 (if you have not already) and enable the Sign in with Facebook option in the [Dashboard > (Your Application) > Settings > Advanced Settings > Device Settings](${manage_url}).
  ![Native Social Login Settings](/media/articles/connections/nativesocial/native-social-login.png)
1. Follow the implementation details below

## Implementation details

### Setup in your application

As above, the process to acquire a user profile from Auth0 using Native Facebook login is a three step one, from your application's perspective:

* **Step 1**: The application authenticates a user via the Facebook SDK. It will obtain an Access Token from Facebook, and will now need to request the user profile.
* **Step 2**: The application uses the Access Token to request a [Facebook Session Info Access Token](https://developers.facebook.com/docs/facebook-login/access-tokens/session-info-access-token).

This request will look similar to the following:

```
GET https://graph.facebook.com/v5.0/oauth/access_token?
grant_type=fb_attenuate_token&
client_id=457704041391802&
fb_exchange_token=<facebook_access_token>
```

and the response:

```json
{
    "access_token": "XAAGgR4b...1lHWNCpqrAhcpoAZDZD",
    "token_type": "bearer",
    "expires_in": 5183924
}
```

* **Step 3**: The application can then use this token to request a user profile from Auth0 by calling Auth0’s `/oauth/token` endpoint using the [client credentials exchange flow](/flows/concepts/client-credentials), with the `facebook-session-access-token` token type. If all goes well, Auth0 will return a normal response from the exchange, with the addition of the user profile.

```
POST https://${account.namespace}/oauth/token

grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange'
subject_token_type: 'http://auth0.com/oauth/token-type/facebook-session-access-token'
audience: 'your-api'
scope: 'read:appointments openid profile email email_verified'
subject_token: 'XAAGgR4b...1lHWNCpqrUHZAEtUuZAhcpoAZDZD'
client_id: '${account.clientID}'
user_profile: '{"email":"john@example.com", "Name":"John Doe"}'
```

and the response from Auth0:

```json
{
    "access_token": "eyJ0eXA..yXQaPLVXg",
    "id_token": "eyJ0.tFE5HPipdOsA",
    "scope": "openid profile email read:appointments",
    "expires_in": 86400,
    "token_type": "Bearer"
}
```

::: note
Auth0 will return the user profile as part of the Client Credentials Exchange payload. This is because the Facebook Session Access Token cannot be used to directly retrieve the profile, and the Facebook access token cannot be sent directly to the server, because of Apple’s policies. Therefore, it must be retrieved in the client and sent to Auth0 in this fashion.
:::

### How Auth0 interacts with Facebook

As part of the client credentials exchange implementation, Auth0 will make two calls to Facebook in the backend:

1. It will call the `graph.facebook.com/debug_token` endpoint with the token sent in the `/oauth/token` call to cofirm that the token is valid and that we can authenticate the user.
1. It will call a new endpoint that Facebook will be creating (for the sake of this dialogue, we will call it `graph.facebook.com/verify_email`),  where Auth0 will send the same Session Access Token plus the email provided in the Auth0 user profile and Facebook is going to validate if the email belongs to that user whose token it is. This will let us flag the email as verified in the Auth0 profile.

### Logout

Since the native login implementation does not make use of standard browser-based flows, application owners must also take care to perform logout appropriately. When an application needs to perform a logout, it should also [Revoke the Auth0 Refresh Token](/api/authentication#revoke-refresh-token).

## Keep reading

* [Rate Limits on Native Social Logins](/policies/rate-limits#limits-on-native-social-logins)
