# Enabling a Simple Connection in Auth0

Connections represent a relationship between Auth0 and an identity provider. Auth0 supports common Enterprise Identity Providers. It also supports popular Social Identity Providers out of the box.

> For all supported identity providers see [here](identityproviders)

This tutorial will use the simplest identity provider (Google OpenId) that requires the no further configuration.

##1. Login into Auth0
Login and select the __Social__ option under the __Connections__ tab:

![](img/connection-add.png)

##2. Enable the Connection 
Choose _Google (OpenID)_ and change status to __Enabled__. Notice the default user attributes supplied by Google OpenId.

![](img/connection-add-idp-attributes.png)

Save the connection. You are done!

##3. Test the new connection
Click on the __Test__ button:

![](img/connection-add-idp-test.png)

You will be redirected to Google for authentication and after that you will return to Auth0 where your user profile will be displayed:

![](img/connection-add-idp-test-r.png)

