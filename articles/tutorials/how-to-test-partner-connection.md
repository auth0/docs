---
description: How to test a partner connection.
---

# Testing a partner connection

Testing a connection in Auth0 is very easy: 

1. Click on the __Try__ button on each connection.
2. Login with the identity provider.
3. Wait for the __It Works!__ page that displays the result. 

Auth0 simulates the authentication flow as if it was an application, displaying the __User Profile__ resulting from a successful authentication.

There's a caveat though: for this to work you have to be logged-in in the dashboard.

This is often not possible if you are testing a connection that belongs to someone else, and you don't have test credentials with them. This is common when connecting to __Enterprise connections__ such as __SAML IdPs__ or __Active Directory__. 

Having your partners test the new connection is very easy nevertheless:

## 1. Create a Test app

Register a new application on Auth0: __[Dashboard > Apps/APIs > Create](${manage_url}/#/applications/create)__. You can give it any name: __Test App__

In the settings of the newly created app, configure __Allowed Callback Urls__ to __[http://jwt.io](http://jwt.io)__.

Click on __SAVE CHANGES__.


## 2. Send your Partner the link to login

  https://${account.namespace}/authorize?response_type=token&scope=openid%20profile&client_id={THE_APP_CLIENT_ID}&redirect_uri=http://jwt.io&connection={THE_CONNECTION_YOU_WANT_TO_TEST}

Make sure you replace these two parameters:

* __client_id__: the app client_id created in __Step 1__.
* __connection__: the name of the connection you want to test.

> `scope=openid profile` will instruct Auth0 to return the full profile. If it is too large, you will see an error. You can trim it by specifying only a few properties: `scope=openid name email`. See [scopes](/scopes) for more details.

## 3. Test it!

When your partner follows the link above, they will be redirected to their configured Identity Provider (the __connection__). After successful authentication, they will be sent back to __[http://jwt.io](http://jwt.io)__ where all user properties will be decoded from the token. 

> Notice that the test app is not a _real_ app. __jwt.io__ is just a testing website that is able to decode tokens sent on a URL fragment.







