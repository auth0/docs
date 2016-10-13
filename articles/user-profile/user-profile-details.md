---
description: This page details Auth0 User Profiles, such as sources of profile data, normalized user profiles, caching, profile structure and custom profiles. 
---

# User Profile: In-Depth Details

The Auth0 **User Profile** is a set of attributes about a user, such as first name, last name, email address, and nickname. The attributes may also include information from social providers, such as a person's contacts or their profile picture, or in the case of Enterprise users, company identifiers such as an employee number or the name of the department to which an employee belongs.

- [Sources of User Profile Data](#sources-of-user-profile-data)
- [Normalized User Profile](#normalized-user-profile)
- [Caching of the User Profile in Auth0](#caching-of-the-user-profile-in-auth0)
- [Structure of User Profile Data](#structure-of-user-profile-data)
- [Storing Custom Profile Data](#storing-custom-profile-data)
- [Application Access to User Profile](#application-access-to-user-profile)
- [Management API Access to User Profiles](#management-api-access-to-user-profiles)
- [User Profile vs Tokens](#user-profile-vs-tokens)
- [Modification of User Profiles](#modification-of-user-profiles)
- [Mapping User Profile Attributes in AD/LDAP Connector](#mapping-user-profile-attributes-in-ad-ldap-connector)
- [Mapping User Profile Attributes in SAML Assertions](#mapping-user-profile-attributes-in-saml-assertions)
- [User Profile with Account Linking](#user-profile-with-account-linking)
- [User Data Storage Guidance](/user-profile/user-data-storage)

## Sources of User Profile Data

User Profile attributes may come from multiple sources. A core set of attributes will come from the service, such as Facebook or LinkedIn, that authenticates a user. Alternatively, the authentication service might be an enterprise provider, such as Active Directory, or a SAML-compliant authentication service operated by a business or other organization.

Other types of authentication services include custom databases, web services, and the database that is included as part of the Auth0 service. These authentication services are also called providers, authentication providers or identity providers (often referred to as IDPs). Within Auth0, they are called **Connections**, because Auth0 connects to them to authenticate a user.

## Normalized User Profile

Auth0 supports [a wide variety of Connections](/identityproviders). Each connection may return a different set of attributes about the user, and each provider may use different names for the same attribute, such as *surname*, *last name* and *family name*. To handle the increased complexity this presents, Auth0 provides a [Normalized User Profile](/user-profile/normalized). Auth0 will return a basic set of information using specific attribute names so programs can rely on using those exact names to retrieve information such as `user_id`, `name`, `nickname`, and `picture`. If available, additional attributes such as `given_name` and `family_name` are also included in the [Normalized User Profile](/user-profile/normalized).

## Caching of the User Profile in Auth0

Auth0 caches the User Profile received from a Connection prior to passing it on to the calling client application. This cache is stored in the Auth0 database. The information in the cache that originates from a Connection is refreshed each time the user authenticates.

The User Profile is cached for several reasons. First, caching allows you the option of implementing [Single Sign-On](/sso) at the Auth0 layer to avoid going to the Connection for every request. Additionally, this provides resilience if a Connection is temporarily unavailable.

You may delete a user's cached profile via the Auth0 Dashboard or the Management API.

## Structure of User Profile Data

There are several components to the User Profile data structure in Auth0. This structure can be viewed by clicking on the [Users tab](${manage_url}/#/users) in the Auth0 Dashboard and then on a particular user.

"Details" consists of core User Profile object with basic information such as name, email, and the timestamp of the latest login. The core User Profile object may contain additional attributes from its source Connection, in addition to the normalized Auth0 User Profile attributes.

The User Profile object then has two **metadata** sub-objects, one called `user_metadata` and the other `app_metadata`. The metadata objects can be used to store additional User Profile information. The `user_metadata` object should be used to store user attributes, such as user preferences, that don't impact what a user can access. The `app_metadata` object should be used for user attributes, such as a support plan, security roles, or access control groups, which can impact how an application functions and/or what the user can access. [Learn more](/api/management/v2/changes#8) about when to use `app_metadata` vs `user_metadata`.

::: panel-info Metadata Data Limits
Both `app_metadata` and `user_metadata` are limited to a size of 16mb each. However, we recommend against using these properties like a database. They should be used for identity related information. Additionally, at some point we may put a more strict size limit on these properties.
:::

::: panel-danger Usage of Metadata
Please note that an authenticated user can modify data in their profile's `user_metadata`, but they can't modify anything in their `app_metadata`.
:::


> Use a consistent datatype each time you create or update a given metadata field. Using `user.user_metadata.age = "23"` for one user and `user.user_metadata.age = 23` for another user will cause issues when retrieving the data.

Lastly, there is a section called `Identity Provider Attributes`. Here you will find all the information retrieved from the authentication provider (e.g. Facebook, Twitter, Google, SAML, your own provider, etc.). This section will always contain at least one identity provider, and it is the one the user originally authenticated against. This data is read-only.

Auth0 also supports the ability for users to [link their profile to multiple identity providers](/link-accounts), and when they do, those additional identities show up in this array. The contents of an individual identity provider object varies by provider, but it will typically include a user identifier, the name of the provider, the name of the connection set up in Auth0 for that provider, whether it is a social provider, and in some cases an API access token that can be used with that provider.

## Storing Custom Profile Data

You can use `user_profile` to store custom attributes such as the user's favorite color or phone number.

Auth0 provides a [JS widget](https://github.com/auth0/auth0-editprofile-widget) that allows the user to update their profile information.

## Application Access to User Profile

The User Profile will be provided to a client app once authentication is complete and control is returned to the app. At a low level, this can be accomplished using one of the [application protocols](/protocols) supported by Auth0. However, most developers prefer to leverage the Auth0 SDKs that are available as [Quickstarts](/).

One SDK is the Auth0 Lock widget, which provides a user login interface:

* [Web interface](/libraries/lock)
* [Lock for iOS and OSX](/libraries/lock-ios)
* [Lock for Android](/libraries/lock-android)

Alternatively, if you'd like your web app to have a custom login UI, you can use [auth0.js](/libraries/auth0js), a headless JavaScript library for Auth0, which invokes authentication flow (as well as other tasks) and receives a User Profile object in return.

## Management API Access to User Profiles

Auth0 provides a REST API that allows applications and services to access and manipulate the User Profile object.

The [API Explorer](/api/v2) allows users to interactively explore the Management API, view the API calls available, the information required for each call, and the information returned by each call. The explorer allows users to try out each endpoint in the explorer UI or via a CuRL command on the command line. To try out one of the Management API commands, select the access required under **Scopes** within that command, such as `update:users`, and then click on "TRY".

Finally, there is the Authentication API specifically used for authentication flows. The documentation for these Authentication API calls can be found [here](/auth-api). Typically, most of these endpoints are used by the various Auth0 SDKs, not your own code. However, one endpoint that is particularly important for User Profile is [`/userinfo`](/auth-api#!#get--userinfo), which will be discussed later in this article.

## User Profile vs Tokens

In the authentication flows described above, Auth0 returns a set of tokens in lieu of a full User Profile.

One of the returned tokens is the `id_token`, which is a [JSON Web Token](/jwt) (or JWT) that contains User Profile attributes represented in the form of *claims*. These claims are statements about the user, which can be trusted if the consumer of the token can verify its signature (which was generated with the Auth0 app's Client Secret). The app can then decode the JWT and get the user information contained in its payload, like the user's name, email, and so forth, typically used for UI display.

The claims within a JWT generally contain a subset of the information available on the User Profile in order to minimize the overall size. For further information on controlling the claims returned in a JWT, see the [Scopes](#scopes) section below.

There are three other types of tokens that can be returned during authentication:

* an Auth0 `access_token`;
* a 3rd party provider access token;
* a `refresh_token`.

For more information on tokens and claims see the [Token Overview](/tokens).

## Modification of User Profiles

The information contained in a User Profile and in an `id_token` can be modified in a number of ways.

### Scopes

The authentication flows supported by Auth0 includes an optional parameter that allows you to specify a scope. This controls the User Profile information (claims) included in the `id_token` (JWT). Examples of different scopes are discussed [here](/scopes).

### Dashboard

The User Profile can also be modified through the Auth0 Management Dashboard. The dashboard allows administrators to manually edit portions of the User Profile for a particular user. This mechanism can be used to alter the `user_metadata` and `app_metadata` portions of the User Profile.

In the Auth0 dashboard, click on "Users", then the user to be edited, then "EDIT". The User Profile attributes within USER metadata and APP metadata can be edited by specifying profile data in JSON format with a key (attribute name) and value (value of the attribute). Pressing "SAVE" will save the information to the Auth0 cache of User Profile information for the user where it will be visible by client applications integrated with Auth0. This "SAVE" will not alter information in the core user profile which is provided by the Connection.

### Management API

The Auth0 Management API provides access to read, update, and delete User Profiles stored in the Auth0 database.

> You can setup Access Control List (ACL)/Roles functionality by adding custom attributes to the user profile. We actually have a [sample](https://github.com/auth0-samples/auth0-roles-permissions-dashboard-sample), that you can use a guide.

#### Limitations
As with the dashboard, the API does not alter data sourced from Connections such as Facebook or Active Directory.

Not all User Profile attributes can be altered via the API. For example, the identities array, which contains information from 3rd party authentication providers, cannot be altered.

> You may not be able to alter the identities array information, but there are some workarounds you could use. For example, let's say you want to modify the picture that is coming from the user's Facebook profile. You cannot change the attribute in the `Identity Provider Attributes` section, so instead you need to set the `picture` attribute in the `user_metadata` property and then in your application you could use `${'<%= user.user_metadata.picture || user.picture %>'}`. This code snippet tries to use the `picture` property from `user_metadata` and if it doesn't exist it uses the default (`user.picture`). You could set this as the `src` of the image to display.

Another example is that the password can be set via the create or update call, but for security purposes, it cannot be viewed via the get or list user commands. The right side of the API explorer provides hints on the User Profile attributes which can be viewed or modified for any given call.

The [`/users`](/api/v2#!/Users/get_users) endpoint is used to retrieve information about all users. You may provide search criteria to find specific user(s).

There is also [an endpoint](/api/v2#!/Users/get_users_by_id) to retrieve information about one user based on the `user_id`. Note that the `user_id` is an internal identifier that consists of a connection name and a unique identifier for the user. The `user_id` is different from the `id_token`.

In addition, two other endpoints are available to retrieve User Profile information based on either the Auth0 `access_token` or the Auth0 `id_token`.

The [`/userinfo`](/auth-api#!#get--userinfo) endpoint takes as input the Auth0 `access_token` and returns User Profile information. This endpoint will include the results of any rules that may have altered the User Profile during the authentication transaction, but the resulting User Profile will not be filtered by any [Scoping](#scopes).

The [`/tokeninfo`](/auth-api#!#post--tokeninfo) endpoint takes as input the Auth0 `id_token` and returns User Profile information. This endpoint will return a result that does not include the results of any rules that alter the User Profile.

### Creating Users in a Custom Database

The above APIs are used for creating and managing users in the Auth0 Database. If a [custom database](/connections/database/mysql) is used as the Connection, scripts must be written to implement lifecycle events such as Create, Login, Verify, Delete and Change Password. Auth0 provides templates for these scripts, but they must be modified as needed for the particular database and schema in use by a particular customer.

The User Profile in the custom DB can be implemented with any User Profile structure desired, but it must be mapped in the Login call to the Auth0 normalized User Profile attributes as shown in the "Login" custom DB template. The Login script can also write to the `app_metadata` portion of the User Profile.

The custom DB templates are accessed via
*Connections* -> *Database* -> *Custom Database*. Be sure to turn on the "Use my own database" toggle to enable editing the scripts.

If additional attributes need to be added to the profile, this can be done with Rules, as explained below.

### Rules

The Auth0 Rules feature is a powerful capability which allows developers to extend the core functionality of Auth0. Rules execute after a user has been authenticated and can be used to augment the User Profile during the authentication transaction, and optionally persist those changes back to Auth0.

Auth0 provides several sample rules to provide examples of how to achieve certain results. In the Auth0 dashboard, these samples can be viewed by clicking on "Rules" and "NEW RULE". There are several samples in the "ENRICH PROFILE" section that show how to add User Profile attributes.

#### Persistent vs Transient profiles

The "ADD ATTRIBUTES TO A USER FOR SPECIFIC CONNECTION" sample shows how to add attributes to a User Profile for a particular login transaction. These attributes will not be persisted in the cached User Profile, so they will not be visible to any other authentication transactions.

The "ADD PERSISTENT ATTRIBUTES TO THE USER" sample shows how to use the `updateUserMetadata` function within a rule to persist the altered User Profile data to the cache of the user's profile data stored in the Auth0 database. This mechanism can be used to alter the `user_metadata` section of the User Profile.

The "SET ROLES TO A USER" sample shows how to use the `updateAppMetadata` function within a rule to persist changes to the `app_metadata` section of the User Profile to the cached User Profile in the Auth0 database.

The altered `user_metadata` and `app_metadata` information that is written to the Auth0 User Profile will be visible by subsequent authentication transactions. Mechanisms for viewing User Profile data that do not occur in the context of an authentication transaction, such as viewing profile information in the Auth0 dashboard, will not show the results of modifications made in Rules, unless those modifications are persisted as described above.

Finally, as with API calls, altering the User Profile in Auth0 does not alter core data sourced from the original Connection.

More info:

* [Rules](/rules)
* [User profile metadata in rules](/rules/metadata-in-rules)
* [Altering SAML authentication assertion attributes/claims for a SAML app](https://github.com/auth0/rules/blob/master/rules/saml-attribute-mapping.md)

### Rules and their Usage

The impact of rules which alter User Profile information will be visible in some situations but not in others. The results of rules will be visible when the profile is viewed or accessed in the context of a user's login transaction. If a client application calls an Auth0 library in the context of a user session, the SDK call will return the User Profile including any modifications made within rules. This also holds true for use of the [`/userinfo`](/auth-api#!#get--userinfo) authentication endpoint.

When the profile is viewed outside the context of the user login transaction, the results of rules will not be included. This is the case when using the [`/tokeninfo`](/auth-api#!#post--tokeninfo) authentication endpoint, or the Auth0 Dashboard.

## Mapping User Profile Attributes in AD/LDAP Connector

For Active Directory or any other LDAP connections that use the Auth0 AD/LDAP connector, there is a mechanism for mapping User Profile attributes in the directory service to the Auth0 User Profile. This mapping takes place when a user authenticates via such a Connection and attributes specified in this mapping are reflected in the Auth0 User Profile.

This mapping is implemented in a file called `profileMapper.js` located in the installation directory of the AD/LDAP connector.

## Mapping User Profile Attributes in SAML Assertions

If the SAML protocol is used between Auth0 and the client application, there are two places where user attribute mapping can occur.

If Auth0 is serving as a SAML Service Provider, the "Mappings" tab for a SAML connection is used to map attributes coming from an IDP to attributes in the Auth0 User Profile.

`Connections -> Enterprise -> SAMLP -> {Name of Connection} -> Settings -> Mappings`

If Auth0 is serving as a SAML Identity Provider, the Settings tab of Application AddOns is used to map attributes from the Auth0 User Profile to attributes in the SAML Assertion sent back to the Service Provider.

`Apps/APIs -> {name of app} - Addons -> SAML2 Web App -> Settings`

## User Profile with Account Linking

Users may log into an application initially via one Connection (e.g. a database). They may then log in via another Connection (e.g. Facebook). In this case, the `user_id` for the second authentication will be different from that for the first authentication. Auth0 provides a mechanism to link the two accounts. If this is done, the `identities` array portion of the User Profile will have multiple elements, one for each provider for which account linking has been done.

Note that the User Profile attributes from the multiple providers are not merged. The core User Profile attributes will be sourced from the first provider used.

Information on linking accounts and examples of profiles are located [here](/link-accounts).
