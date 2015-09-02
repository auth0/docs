# Enabling a Simple Connection in Auth0

Connections represent a relationship between Auth0 and an identity provider. Auth0 supports common Enterprise Identity Providers. It also supports popular Social Identity Providers out of the box.

> For all supported identity providers see [here](/identityproviders)

This tutorial will use the simplest identity provider (Google OAuth2) that requires minimal configuration.

## 1. Login into Auth0
Login and select the __Social__ option under the __Connections__ tab:

![](/media/articles/enable-simple-connection/connection-add.png)

## 2. Enable the Connection
Choose _Google/Gmail_ and change status to __Enabled__. Notice all attributes about the user that are supplied by Google, select the ones you are interested in:

![](/media/articles/enable-simple-connection/connection-add-idp-attributes.png)

Save the connection. You are done!

## 3. Test the new connection
Click on the __Test__ button:

![](/media/articles/enable-simple-connection/connection-add-idp-test.png)

You will be redirected to Google for authentication and after that you will return to Auth0 where your user profile will be displayed:

![](/media/articles/enable-simple-connection/connection-add-idp-test-r.png)

> For full integration with Google OAuth2, you need to obtain a `clientId` and a `clientSecret`. For a quick setup you don't need it. See [here](/connections/social/google) for details.
