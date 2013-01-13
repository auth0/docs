# Adding and Enabling Connections in Auth0

Connections represent a relationship between Auth0 and an identity provider. Auth0 supports common Enterprise Identity Providers. It also supports popular Social Identity Providers out of the box.

> For all supported identity providers see [here](identityproviders)

## Adding new Enterprise Connections

###1. Login into Auth0
Login and select the __Enterprise__ option under the __Connections__ tab. Click on the __Add Connection__ button:

![](img/connection-add.png)

###2. Choose the authentication type
Each Identity Provider will require a different set of parameters. The [Identity Providers](identityproviders) section describes in detail each of these.




## Enabling Social Connections

Enterprise 
Follow these steps to create a new connection. This tutorial will use the simplest identity provider (Google OpenId) that requires no further configuration. 

  

##1. Login into Auth0
Login and select the __Connections__ tab. Click on the __Add Connection__ button:



##2. Select the Google OpenId 
Name your connection and select Google OpenId as the identity provider:

![](img/connection-add-idp.png)

Google OpenId supplies a number of user attributes by default:

![](img/connection-add-idp-attributes.png)

Save the connection. You are done!

##3. Test the new connection
Click on the __Test__ button:

![](img/connection-add-idp-test.png)

You will be redirected to Google for authentication and after that you will return to Auth0 where your user profile will be displayed:

![](img/connection-add-idp-test-r.png)

