---
description: Explains the basics of Auth0 user profiles.
toc: true
topics:
    - users
    - user-management
    - user-profiles
contentType: concept
useCase: manage-users
v2: true
---
# User Profiles

Auth0 stores user information for your tenant in a hosted cloud database. Those users have access to applications connected to that tenant. User profiles contain information about your users such as name and contact information. Auth0 provides a variety of tools to help you manage user profiles such as the Dashboard and the Management API. You can create, search, view, and delete users.  

## Data sources

User information is stored in a *user profile* and can come from a variety of sources such as [identity providers](/identityproviders), your own databases, and enterprise connections (Active Directory, <dfn data-key="security-assertion-markup-language">SAML</dfn>, etc.). You can normalize user data that comes from a variety of data sources.

The user profile attributes can also include information from the authenticating services (such as Facebook or LinkedIn). The authentication service might be an enterprise provider, such as Active Directory, or a SAML-compliant authentication service operated by a business or other organization. For example, attributes can be a person's contacts and their profile picture, or in the case of Enterprise users, an employee number or the name of the department to which an employee belongs.

Attributes can also come from custom databases and web services. Auth0 refers to all attribute sources as **connections** because Auth0 connects to them to authenticate the user.

## Data normalization

Auth0 supports a wide variety of connections. Each connection may return a different set of attributes about the user, and each provider may use different names for the same attribute, such as *surname*, *last name* and *family name*. To handle the increased complexity this presents, Auth0 provides a [Normalized User Profile](/users/normalized). Auth0 returns a basic set of information using specific attribute names so programs can rely on using those same names to retrieve information such as `user_id`, `name`, `nickname`, and `picture`. If available, additional attributes such as `given_name` and `family_name` are also included in the Normalized User Profile.

## Caching user profiles

Auth0 caches the user profile received from a connection prior to passing it on to the calling application. This cache is stored in the Auth0 database. The information in the cache that originates from a connection is refreshed each time the user authenticates. See [Update User Profile Using Your Database](/users/guides/update-user-profiles-using-your-database#user-profile-cache)

## Data structure

There are several components to the User Profile data structure in Auth0. This structure can be viewed by clicking on the [Users tab](${manage_url}/#/users) in the Auth0 Dashboard and then on a particular user. See [User Profile Structure](/users/references/user-profile-structure).

## Custom user profile data 

Auth0 allows you to store **metadata**, which is data related to each user that has not come from the identity provider. 
You can use `user_metadata` to store custom attributes such as the user's favorite color or hobby. See [Metadata](/users/concepts/overview-user-metadata).

Auth0 provides a [JS widget](https://github.com/auth0/auth0-editprofile-widget) that allows the user to update their own profile information. 

## User profile application access

The User Profile will be provided to an application once authentication is complete and control is returned to the app. At a low level, this can be accomplished using one of the [application protocols](/protocols) supported by Auth0. However, most developers prefer to leverage the Auth0 SDKs that are available as [Quickstarts](/quickstarts).

One SDK is the Auth0 Lock widget, which provides a user login interface:

* [Web interface](/libraries/lock)
* [Lock for iOS and OSX](/libraries/lock-ios)
* [Lock for Android](/libraries/lock-android)

Alternatively, if you'd like your web app to have a custom login UI, you can use [auth0.js](/libraries/auth0js), a headless JavaScript library for Auth0, which invokes authentication flow (as well as other tasks) and receives a User Profile object in return.

## User profile Management API access

Auth0 provides a REST API that allows applications and services to access and manipulate the User Profile object.

The [API Explorer](/api/v2) allows users to interactively explore the Management API, view the API calls available, the information required for each call, and the information returned by each call. The explorer allows users to try out each endpoint in the explorer UI or via a CuRL command on the command line. To try out one of the Management API commands, select the access required under **Scopes** within that command, such as `update:users`, and then click on "TRY".

Finally, there is the Authentication API specifically used for authentication flows. See [Authentication API Explorer](/api/authentication) for more information. Typically, most of these endpoints are used by the various Auth0 SDKs, not your own code. However, one endpoint that is particularly important for User Profile is [`/userinfo`](/api/authentication/reference#get-user-info), which will be discussed later in this article.

## User profile vs. tokens

In the authentication flows described above, Auth0 returns a set of tokens in lieu of a full User Profile.

One of the returned tokens is the ID Token, which is a [JSON Web Token](/tokens/concepts/jwts) (or JWT) that contains user profile attributes represented in the form of *claims*. These claims are statements about the user, which can be trusted if the consumer of the token can verify its signature, which is generated with the Auth0 app's Client Secret in the case of `HS256`. In case the application uses `RS256` encryption then the ID Token will be signed with a private key and verified with a public key. The app can then decode the JWT and get the user information contained in its payload, like the user's name, email, and so forth, typically used for UI display.

The claims within a JWT generally contain a subset of the information available on the user profile in order to minimize the overall size. For further information on controlling the claims returned in a JWT, see the [Scopes](#scopes) section below.

There are three other types of tokens that can be returned during authentication:

* Auth0 Access Token
* Third-party provider Access Token
* <dfn data-key="refresh-token">Refresh Token</dfn>

For more information on tokens and claims see [Tokens](/tokens).

## User profile data modification

The information contained in a user profile and in an ID Token can be modified in a number of ways.

* [**Scopes**](/scopes): The authentication flows supported by Auth0 includes an optional parameter that allows you to specify a scope. This controls the user profile information (claims) included in the ID Token (JWT). 

* [**Management Dashboard**](/users/guides/manage-users-using-the-dashboard): The dashboard allows administrators to manually edit portions of the user profile for a particular user. This mechanism can be used to alter the `user_metadata` and `app_metadata` portions of the user profile.

* [**Management API**](/users/guides/manage-users-using-the-management-api): Provides access to read, update, and delete user profiles stored in the Auth0 database.

* [**Custom database scripts**](/connections/database/custom-db/templates): If a custom database is used as the connection, you can write scripts to implement lifecycle events such as create, login, verify, delete and change password. Auth0 provides templates for these scripts that you can modify for the particular database and schema.

* [**Rules**](/rules/metadata-in-rules): Rules execute after a user has been authenticated. Use Rules to augment the user profile during the authentication transaction, and optionally persist those changes back to Auth0. 

## User profile attribute mapping

### AD/LDAP connector

For Active Directory or any other LDAP connections that use the Auth0 AD/LDAP connector, there is a mechanism for mapping User Profile attributes in the directory service to the Auth0 User Profile. This mapping takes place when a user authenticates via such a Connection and attributes specified in this mapping are reflected in the Auth0 User Profile.

This mapping is implemented in a file called `profileMapper.js` located in the installation directory of the AD/LDAP connector.

### SAML assertions

If the SAML protocol is used between Auth0 and the application, there are two places where user attribute mapping can occur.

If Auth0 is serving as a SAML Service Provider, the "Mappings" tab for a SAML connection is used to map attributes coming from an IDP to attributes in the Auth0 User Profile.

`Connections -> Enterprise -> SAMLP -> {Name of Connection} -> Settings -> Mappings`

If Auth0 is serving as a SAML Identity Provider, the Settings tab of Application AddOns is used to map attributes from the Auth0 User Profile to attributes in the SAML Assertion sent back to the Service Provider: **[Dashboard](${manage_url}) > Applications > name of your app > Addons > SAML2 Web App > Settings**.

## Account linking

Users can log into an application initially via one connection (such as a database), then log in via another connection (such as Facebook). In this case, the `user_id` for the second authentication will be different from that for the first authentication. 

Auth0 provides a mechanism to [link](/users/concepts/overview-user-account-linking) the two accounts. If this is done, the `identities` array portion of the user profile will have multiple elements, one for each provider for which account linking has been done.

::: note
The user profile attributes from multiple providers are not merged. The core user profile attributes are sourced from the first provider used.
:::
