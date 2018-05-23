---
description: How to test a partner connection.
tags:
  - connections
  - troubleshootin
---
# Testing a partner connection

Testing a connection in Auth0 is very easy: 

1. Click on the __Try__ button on each connection.
1. Login with the identity provider.
1. Wait for the __It Works!__ page that displays the result. 

Auth0 simulates the authentication flow as if it was an application, displaying the __User Profile__ resulting from a successful authentication.

There's a caveat though: for this to work you have to be logged-in in the dashboard.

This is often not possible if you are testing a connection that belongs to someone else, and you don't have test credentials with them. This is common when connecting to __Enterprise connections__ such as __SAML IdPs__ or __Active Directory__. 

Having your partners test the new connection is very easy nevertheless:

## 1. Create a Test app

To register a new application on Auth0 go to [Dashboard > Applications > Create](${manage_url}/#/applications/create). You can give it any name, for example, `Test App`.

In the settings of the newly created app, configure __Allowed Callback Urls__ to `http://jwt.io`.

Click on __SAVE CHANGES__.

## 2. Send your Partner the link to login

```text
https://${account.namespace}/authorize?response_type=token&scope=openid%20profile&client_id=${account.clientId}&redirect_uri=http://jwt.io&connection=THE_CONNECTION_YOU_WANT_TO_TEST
```

Make sure you replace these two parameters:

* __client_id__: the app client_id created in __Step 1__.
* __connection__: the name of the connection you want to test.

## 3. Test it

When your partner follows the link above, they will be redirected to their configured Identity Provider (the __connection__). After successful authentication, they will be sent back to [JWT.io](http://jwt.io) where all user properties will be decoded from the token. 

::: note
Note that the test app is not a _real_ app. [JWT.io](http://jwt.io) is just a testing website that is able to decode tokens sent on a URL fragment.
:::