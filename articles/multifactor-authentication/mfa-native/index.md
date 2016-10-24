---
title: MFA on a Resource Owner endpoint
description: How to enable your native iOS or Andriod app to use Multifactor Authentication.
url: /multifactor-authentication/mfa-native
---

# Multifactor Authentication for Native Applications

You can enable your native iOS or Andriod app to use Multifactor Authentication.

This tutorial demonstrates setting up MFA for iOS.

## Initial setup

If you don't already have an application you would like to add MFA to, you can download a seed project from one of the quickstarts.

This tutorial uses the [iOS - Objective C](/quickstart/native/ios-objc) sample project.

### Configure the sample project

Open the `basic-sample/Info.plist` file and replace the `CLIENT_ID` and `TENANT` fields with your Auth0 account information.

```
<key>Auth0ClientId</key>
<string>${account.clientId}</string>
<key>Auth0Domain</key>
<string>${account.namespace}</string>
```

### Run the example

To run the project, you need to have XCode installed. 

Then, in terminal, `cd` to the `native-mobile-samples-sample` directory and execute these commands:

`pod install`

`open basic-sample.xcworkspace`

## Dashboard settings

Go to the [Multifactor Auth](${manage_url}/#/multifactor) page in the Auth0 Dashboard and enable **Google Authenticator**:

![Multifactor Auth](/media/articles/mfa/mfa-native/mfa-native-01.png)

**NOTE:** MFA for native apps currently supports Google Authenticator only.

Update this line in of code that appears under **Customize Google-Authenticator** with your `client-id`:

`var CLIENTS_WITH_MFA = ['${account.clientId}'];`

Click **SAVE**.

![Google-Authenticator](/media/articles/mfa/mfa-native/mfa-native-02.png)

## Set the flags

To enable Multifactor Authentication and enrollment, you must set the `options.mfa.active` and `options.mfa.return_enroll_settings` flags using the `PATCH  /api/v2/connections/{id}` endpoint.

1. Go to [Database Connections](${manage_url}/#/connections/database) and select the database you want to use. 

2. Copy the database `id` from the URL of the **Settings** page of your database. It will be in the form: `con_xxxxxxxxxxxxxxxx`.

    ![Database Connections](/media/articles/mfa/mfa-native/mfa-native-03.png)

**NOTE:** Also make sure that at least one of your apps is enabled for this database:

![Database Connections](/media/articles/mfa/mfa-native/mfa-native-04.png)

Now go to the [PATCH /api/v2/connections/{id}](/api/management/v2#!/Connections/patch_connections_by_id) endpoint.

![Patch Connections](/media/articles/mfa/mfa-native/mfa-native-05.png)

1. Select the `update:connections` scope.

2. Enter the database `id` obtained previously in the `id`field.

3. Enter the following for the body:

  ```
{
 "options": {
    "mfa": { "active" : true, "return_enroll_settings" : true }
},
 "enabled_clients": [
   "${account.clientId}"
 ]
}
  ```
4. Click **TRY** to call the API and set the flags.

You should receive a response similar to:

```
{
  "id": "con_xxxxxxxxxxxxxxxx",
  "options": {
    "mfa": {
      "active": true,
      "return_enroll_settings": true
    },
    "brute_force_protection": true
  },
  "strategy": "auth0",
  "name": "Username-Password-Authentication",
  "enabled_clients": [
    "YOUR_CLIENT_ID"
  ]
}
```

## Run the simulator

Now you can run the simulator in your sample project and sign-in to your Auth0 app with MFA.

1. In XCode, run the simulator:

2. Click **Sign-in**:

    ![Simulator](/media/articles/mfa/mfa-native/mfa-native-06.png)

3. Select a provider (Google in this example):

    ![Simulator](/media/articles/mfa/mfa-native/mfa-native-07.png)

4. Scan the QR code with Google Authenticator:

    ![Simulator](/media/articles/mfa/mfa-native/mfa-native-08.png)

5. Enter the code provided by Google Authenticator:

    ![Simulator](/media/articles/mfa/mfa-native/mfa-native-09.png)

6. You're in!

    ![Simulator](/media/articles/mfa/mfa-native/mfa-native-10.png)
  
## Behind the scenes

The Lock for iOS widget calls the [Resource Owner](/api/authentication#!#post--oauth-ro) endpoint to handle the authentication.

![Resource Owner](/media/articles/mfa/mfa-native/mfa-native-11.png)

If you have set the `options.mfa.return_enroll_settings` flag to true using the `PATCH  /api/v2/connections/{id}` endpoint, the Resource Owner response will include a url to a QR code: 

```
{
  "error": "a0.mfa_registration_required",  
  "error_description": "User is not enrolled with google-authenticator",
  
  "mfa_settings": {
    "provider": "google-authenticator",
    "key": "GYQUC4JRKVLS6MJEF4YCUxxxxxxxxx",
    "qr": "https://chart.googleapis.com/chart?chs=166x166&chld=L%7C0&cht=qr&chl=otpauth%3A%2F%2Ftotp%2Fjohn%2540doe.com%3Fsecret%3DGYQUC4JRKVLS6MJEF4YCUOTVxxxxxxxx%26issuer%3Djohncato"
  }
}
```

Otherwise, the response is a simple error code: 

```
{
  "error": "a0.mfa_registration_required",
  "error_description": "User is not enrolled with google-authenticator"
}
```