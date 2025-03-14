---
title: Add Facebook Login to Native Apps
connection: Facebook Native
image: /media/connections/facebook.png
public: true
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

You can add functionality to your native application to allow your users to authenticate using Facebook natively, within the application. This does not require redirection via a web browser and will let mobile applications comply with [Facebook Developer Policy](https://developers.facebook.com/policy/) which requires that mobile applications use the Facebook SDK for [Android](https://developers.facebook.com/docs/android) or [iOS](https://developers.facebook.com/docs/ios) to authenticate.

::: note
When integrating with the Facebook SDKs, your applications will be sharing data with Facebook. Make sure you understand the data that is being shared and that you reflect it properly in your application's privacy policy. Auth0 has no control over what data will be shared with Facebook via the SDK. 

Check the [Facebook GDPR](https://www.facebook.com/business/m/one-sheeters/gdpr-developer-faqs) page for more information about data collected by the Facebook SDK and Facebook Login.
:::

## How it works

The Native Facebook login flow works as follows:

* **Step 1**: The application authenticates a user via the Facebook SDK and acquires an Access Token.
* **Step 2**: The application uses that Access Token to request a special [Facebook Session Info Access Token](https://developers.facebook.com/docs/facebook-login/access-tokens/session-info-access-token).
* **Step 3**: Use the Facebook SDK to retrieve the users's profile
* **Step 4**: The application can then use the Facebook Session Info token to authenticate with Auth0.

## Prerequisites

Before you configure Native Facebook login for your native app via Auth0, you must:

1. [Set up your application](/connections/social/facebook) with Facebook and as an Auth0 connection
1. [Use the relevant Facebook SDK in your application](https://developers.facebook.com/docs/apis-and-sdks/)
1. Navigate to [Auth0 Dashboard > Applications > Applications](${manage_url}/#/applications), and create an application with Auth0 (if you have not already).
1. At the bottom of the settings page, select **Show Advanced Settings** and then the **Device Settings** view. Under **Native Social Login**, enable the **Enable Sign In with Facebook** toggle.
    ![Native Social Login Settings](/media/articles/connections/nativesocial/dashboard-applications-edit_view-settings-advanced_device-settings_facebook-enabled.png)
1. Complete the following implementation details:

## Implementation details

As above, the process to authenticate a user profile using Native Facebook login is a four-step one, from your application's perspective:

### Step 1

The application authenticates a user via the Facebook SDK. It will obtain an Access Token from Facebook.

### Step 2

The application uses the Access Token to request a [Facebook Session Info Access Token](https://developers.facebook.com/docs/facebook-login/access-tokens/session-info-access-token).

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

### Step 3

The application needs to retrieve the user profile from Facebook using the Facebook SDK, which will end in a request similar to the following:

```
GET https://graph.facebook.com/v5.0/<facebook user id>?access_token=<facebook access token>&fields=email,name 
```

### Step 4

The application can then use the session info Access Token and the Facebook user profile to authenticate with Auth0 by calling Auth0's `/oauth/token` endpoint using the Token Exchange flow with the `facebook-session-access-token` token type. If all goes well, Auth0 will return a normal response from the exchange, with the addition of the user profile. The user profile should be a JSON object, encoded as a string.

```
POST https://${account.namespace}/oauth/token

grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange'
subject_token_type: 'http://auth0.com/oauth/token-type/facebook-info-session-access-token'
audience: 'your-api'
scope: 'read:appointments openid profile email email_verified'
subject_token: 'XAAGgR4b...1lHWNCpqrUHZAEtUuZAhcpoAZDZD'
client_id: '${account.clientId}'
user_profile: '{"email":"john@example.com", "name":"John Doe"}'
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

## User Profile and Email Validation

In the previous example, you had to retrieve the User Profile from Facebook and include it in the call to `/oauth/token`. This is because the Facebook Session Access Token cannot be used to directly retrieve the profile, and the Facebook Access Token cannot be sent directly to the server, due to [Apple's AppStore Review Guidelines](https://developer.apple.com/app-store/review/guidelines). Therefore, it must be retrieved in the client and sent to Auth0 in this fashion.

Given that Auth0 can't guarantee that the user profile is the same that was returned by Facebook, it will set the `email_verified` field to `false`. 

## Logout

Since the native login implementation does not make use of standard browser-based flows, application owners must also take care to perform logout appropriately. When an application needs to perform a logout, it should also [Revoke the Auth0 Refresh Token](/api/authentication#revoke-refresh-token).

## Keep reading

* [Native Facebook Login with iOS Swift](/quickstart/native/ios-swift-facebook-login)
* [Native Facebook Login with Android](/quickstart/native/android-facebook-login)
* [Rate Limits on Native Social Logins](/policies/rate-limits#limits-on-native-social-logins)
