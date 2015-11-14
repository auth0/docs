---
url: /user-profile
---

# User profile

## Overview

This document explains the Auth0 User Profile, its structure and how to access and modify it. Several links are included to other documents which provide additional, more detailed information.

The **User Profile** is a set of attributes about a user.  The attributes may include basic information such as first name, last name, email address, and a nickname.  The attributes may also include information from social providers such as a person's contacts or their profile picture.  In the case of employees, the attributes may include company identifiers such as an employee number, the name of the department to which an employee belongs, and groups or roles used for access control.  The amalgamation of attributes from multiple sources makes up the User Profile.

Following are topics which will help us gain a better understanding of the User Profile, including its structure, how its created, how it can be accessed by your application, and how it can be modified.

- [Sources of User Profile Data](#sources-of-user-profile-data)
- [Normalized User Profile](#normalized-user-profile)
- [Caching of the User Profile in Auth0](#caching-of-the-user-profile-in-auth0)
- [Structure of User Profile Data](#structure-of-user-profile-data)
- [Storing custom Profile Data](#storing-custom-profile-data)
- [Application Access to User Profile](#application-access-to-user-profile)
- [API Access to User Profiles](#api-access-to-user-profiles)
- [User Profile vs Tokens](#user-profile-vs-tokens)
- [Modification of User Profiles](#modification-of-user-profiles)
- [Mapping User Profile Attributes in AD/LDAP Connector](#mapping-user-profile-attributes-in-adldap-connector)
- [Mapping User Profile Attributes in SAML Assertions](#mapping-user-profile-attributes-in-saml-assertions)
- [User Profile with Account Linking](#user-profile-with-account-linking)

> If you're interested in a deeper dive into the various access tokens used by Auth0, see [Tokens](/tokens).

## Sources of User Profile Data

As implied above, User Profile attributes may come from multiple sources.  A core set of attributes will come from the service that authenticates a user.  The authentication service might be a social provider such as Facebook or LinkedIn.  Alternatively, the authentication service might be an enterprise provider, such as Active Directory, ADFS or a SAML-compliant authentication service operated by a business or other organization.  In such a case, the user is typically acting on behalf of the business or organization and the business is the authoritative source of information for the profile data.  Additional types of authentication services are custom databases, web services and the database that is included as part of the Auth0 service.  In general, these authentication services are also called providers, authentication providers or identity providers (often referred to as IDP's).  In the context of the Auth0, they are called **Connections** because Auth0 connects to them to authenticate a user.

## Normalized User Profile

Auth0 supports a wide variety of Connections (authentication providers).  Each connection may return a somewhat different set of attributes about the user and each provider may use different names for the same basic attribute, such as *surname*, *last name* and *family name*.  This would add a lot of complexity to programs but fortunately Auth0 provides a normalized User Profile.  This means that Auth0 will return a basic set of information using specific attribute names so programs can rely on using those exact names to retrieve specific information such as `user_id`, `name`, `nickname`, and `picture`.  If available from the Connection, additional attributes such as `given_name` and `family_name` are also included in the normalized Auth0 User Profile.

More information on the normalized Auth0 User Profile and the additional attributes returned by different Connection can be found on the [Normalized User Profile](/user-profile/normalized) page. You can also check out a [recent blog post](https://auth0.com/blog/2015/04/15/update-of-the-user-details-section/) that describes the User Profile.

## Caching of the User Profile in Auth0

The User Profile information returned from a Connection is received and cached by Auth0 before being passed on to the calling client application.  This cache is stored in the Auth0 database. The information in the cache that originates from a Connection is refreshed from the Connection each time the user authenticates. There can be additional information added to the User Profile that originates from other sources and the maintenance of such  information is up to customers to implement.

The User Profile information is cached in Auth0 for several reasons, including the option to implement [Single Sign-On](/sso/single-sign-on) at the Auth0 layer to avoid going to the Connection for every request, and the ability to provide some resilience if a Connection is temporarily unavailable. The cached profile for a user can be deleted using the Auth0 dashboard or the Auth0 API.

## Structure of User Profile Data

There are several components to the User Profile data structure in Auth0. This structure can be viewed by clicking on the [Users tab](${uiURL}/#/users) in the Auth0 Dashboard and then on a particular user.

At the top of "Details" will be the core User Profile object with basic information such as name, email, country (if available), latest login and a few other fields.  The core User Profile object may contain additional attributes from its source Connection, in addition to the normalized Auth0 User Profile attributes.  For example, the Google Social Connection also returns the gender attribute.

The User Profile object then has two **metadata** sub-objects, one called `user_metadata` and the other `app_metadata`.  The metadata objects can be used to store additional User Profile information to augment what comes from the Connections.  The `user_metadata` object should be used to store user attributes, such as user preferences, that don't impact what a user can access.  The `app_metadata` object should be used for user attributes, such as a support plan, security roles, or access control groups, which can impact how an application functions and/or what the user can access. It should also be noted that an authenticated user can modify data in their profile's `user_metadata` but they can't modify anything in their `app_metadata`.

Lastly you will also notice a special property called `identities`, which is an array of identity providers (Connections).  It will always contain at least one identity provider and that one represents the Connection that the user originally authenticated against.  However, Auth0 supports the ability for users to [link their profile to multiple identity providers](/link-accounts), and when they do, those additional identities (Connections) show up in this array.  The contents of an individual identity provider object varies by provider, but will typically include a user identifier, the name of the provider, the name of the connection set up in Auth0 for that provider, whether it is a social provider, and in some cases an API access token that can be used with that provider.

## Storing custom Profile Data

There are cases where you might want to augment the user profile with custom profile information like the user's favourite color or phone number. We encourage to use the `user_profile` to store this kind of information. 

Auth0 provides a [JS widget](https://github.com/auth0/auth0-editprofile-widget) you can use to let the user to update their profile info.

## Application Access to User Profile

The User Profile will generally be provided to a client application once authentication is complete and control is returned to the app. At a low level this can be accomplished using one of the [application protocols](/protocols) supported by Auth0. However, most developers prefer to leverage the Auth0 SDK's that are available for the most popular platforms and languages.

Perhaps the most popular SDK is the Auth0 Lock widget, which varies depending on the type of client application:

* [Web interface](/libraries/lock)
* [Lock for iOS and OSX](/libraries/lock-ios)
* [Lock for Android](/libraries/lock-android)

Alternatively, if web applications desire to build their own login UI, they can use [auth0.js](/libraries/auth0js), a headless JavaScript library for Auth0, which can invoke authentication flow (as well as other tasks) and ultimately receive a User Profile object in return.

Similar SDK's exist for many other platforms.  See the [Quickstarts](/) for more information.

## API Access to User Profiles

Auth0 provides a REST API that allows applications and services to access and manipulate the User Profile object.

There is an [API Explorer](/api/v2) that allows users to interactively explore the API, view the API calls available, the information required for each call and the information returned by each call.  The explorer allows users to try out each endpoint in the explorer UI or via a CuRL command on the command line.   To try out one of the API commands, simply select the access required under **Scopes** within that command, such as `update:users`, and then click on "TRY".

There is an [older version of the API](/api/v1) (v1) that is still being used by some customers today.  However, it is recommended that customers migrate to v2 (the current version), since future support for v1 will be limited.  If you're using v1 and would like to see the differences between the two version, see the [API v1 vs v2](/api/v2/changes) article.

Finally, there is an API specifically used for authentication flows. The documentation for these authentication API calls can be found [here](/auth-api).  Most of these endpoints are used by the various Auth0 SDK's and typically not your own code.  However, one endpoint that is particularly important for User Profile is [`/userinfo`](/auth-api#!#get--userinfo), which  will be discussed later in this article.

## User Profile vs Tokens

In the authentication flows described above, a full User Profile is not returned directly. Rather Auth0 generates a set of tokens.

Perhaps the most well known token is the `id_token`, which is a [JSON Web Token](/jwt) (or JWT) that contains User Profile attributes represented in the form of *claims*. These claims are statements about the user, which can be trusted if the consumer of the token can verify its signature (which was generated with the Auth0 app's Client Secret). The app can then use the JWT to securely call other API's as long as those API's can verify the JWT's signature, and trust and use the contained claims.

The claims within a JWT can contain all of the properties of the User Profile. But more often than not they contain a subset of them in order minimize the overall size. For further information on controlling the claims returned in a JWT see the [Scopes](#scopes) section below.

There are three other types of tokens that can be returned during authentication, namely an Auth0 `access_token`, a 3rd party provider access token, and a `refresh-token`. For more information on tokens and claims see the [Token Overview](/tokens).

## Modification of User Profiles

The information contained in a User Profile and in an `id_token` can be modified in a number of ways, as described below.

### Scopes

In the authentication flows supported by Auth0, there is an optional parameter that allows you to specify a scope which controls the User Profile information (claims) included in the `id_token` (JWT). Examples of different scopes are discussed [here](/jwt#2-body).

### Dashboard

The User Profile can also be modified through the Auth0 Dashboard. The dashboard allows administrators to manually edit portions of the User Profile for a particular user.  This mechanism can be used to alter the `user_metadata` and `app_metadata` portions of the User Profile.

In the Auth0 dashboard, click on "Users", then the user to be edited, then "EDIT".  The User Profile attributes within USER metadata and APP metadata can be edited by specifying profile data in JSON format with a key (attribute name) and value (value of the attribute). Pressing "SAVE" will save the information to the Auth0 cache of User Profile information for the user where it will be visible by client applications integrated with Auth0. This "SAVE" will not alter information in the core user profile which is provided by the Connection.

### API

The Auth0 API provides access to read, update and delete User Profiles stored in the Auth0 database.  As with the dashboard, it does not alter data sourced from Connections such as Facebook or Active Directory. Not all User Profile attributes can be altered via the API. For example, the identities array, which contains information from 3rd party authentication providers, cannot be altered. Another example is that the password can be set via the create or update call but for security purposes, it cannot be viewed via the get or list user commands. The right side of the API explorer provides hints on the User Profile attributes which can be viewed or modified for any given call.

The [`/users`](/api/v2#!/Users/get_users) endpoint is used to retrieve information about all users.  Various search criteria can be specified.

There is also [an endpoint](/api/v2#!/Users/get_users_by_id) to retrieve information about one user based on the `user_id`.  Note that the `user_id` is an internal identifier that consists of a connection name and a unique identifier for the user.  The `user_id` is different from the `id_token`.

In addition, two other endpoints are available to retrieve User Profile information based on either the Auth0 `access_token` or the Auth0 `id_token`.

The [`/userinfo`](/auth-api#!#get--userinfo) endpoint takes as input the Auth0 `access_token` and returns User Profile information.  This endpoint will include the results of any rules that may have altered the User Profile during the authentication transaction. But the resulting User Profile will not be filtered by any [Scoping](#scopes). Note that the `access_token` passed to the call must not be expired, or you will get an error.

The [`/tokeninfo`](/auth-api#!#post--tokeninfo) endpoint takes as input the Auth0 `id_token` and returns User Profile information. This endpoint will return a result that does not include the results of any rules that alter the User Profile. This endpoint also requires an `id_token` that is not expired.

### Creating Users in a Custom Database

The above APIs are used for creating and managing users in the Auth0 Database.  If a [custom database](/connections/database/mysql) is used as the Connection, scripts must be written to implement lifecycle events such as Create, Login, Verify, Delete and Change Password.  Auth0 provides templates for these scripts but they must be modified as needed for the particular database and schema in use by a particular customer.

The User Profile in the custom DB can be implemented with any User Profile structure desired, but must be mapped in the Login call to the Auth0 normalized User Profile attributes as shown in the "Login" custom DB template. The Login script can also write to the `app_metadata` portion of the User Profile.

The custom DB templates are accessed via
*Connections* -> *Database* -> *Custom Database*.  Be sure to turn on the "Use my own database" toggle to enable editing the scripts.

If additional attributes need to be added to the profile, this can be done with Rules, as explained below.

### Rules

The Auth0 Rules feature is a powerful capability which allows developers to extend the core functionality of Auth0.  Rules execute after a user has been authenticated and can be used to augment the User Profile during the authentication transaction, and optionally persist those changes back to Auth0.

Auth0 provides several sample rules to provide examples of how to achieve certain results.  In the Auth0 dashboard, these samples can be viewed by clicking on "Rules" and "NEW RULE".  There are several samples in the "ENRICH PROFILE" section that show how to add User Profile attributes.

#### Persistent vs Transient profiles

The "ADD ATTRIBUTES TO A USER FOR SPECIFIC CONNECTION" sample shows how to add attributes to a User Profile for a particular login transaction.  These attributes will not be persisted in the cached User Profile, so will not be visible to any other authentication transactions.

The "ADD PERSISTENT ATTRIBUTES TO THE USER" sample shows how to use the `updateUserMetadata` function within a rule to persist the altered User Profile data to the cache of the user's profile data stored in the Auth0 database. This mechanism can be used to alter the `user_metadata` section of the User Profile.

The "SET ROLES TO A USER" sample shows how to use the `updateAppMetadata` function within a rule to persist changes to the `app_metadata` section of the User Profile to the cached User Profile in the Auth0 database.

The altered `user_metadata` and `app_metadata` information that is written to the Auth0 User Profile will be visible by subsequent authentication transactions. Mechanisms for viewing User Profile data that do not occur in the context of an authentication transaction, such as viewing profile information in the Auth0 dashboard, will not show the results of modifications made in Rules, unless those modifications are persisted as described above. A final caveat is that as with API calls, altering the User Profile in Auth0 does not alter core data sourced from the original Connection.

More info:

* [Rules](/rules)
* [User profile metadata in rules](/rules/metadata-in-rules)
* [Altering SAML authentication assertion attributes/claims for a SAML app](https://github.com/auth0/rules/blob/master/rules/saml-attribute-mapping.md)

### When Rules are used and when they are not

The impact of rules which alter User Profile information will be visible in some situations but not in others.  The results of rules will be visible when the profile is viewed or accessed in the context of a user's login transaction.  If a client application calls an Auth0 library in the context of a user session, the SDK call will return the User Profile including any modifications made within rules.  This also holds true for use of the [`/userinfo`](/auth-api#!#get--userinfo) authentication endpoint.

When the profile is viewed outside the context of the user login transaction, the results of rules will not be included.  This is the case when using APIv2, the [`/tokeninfo`](/auth-api#!#post--tokeninfo) authentication endpoint, or the Auth0 Dashboard.

## Mapping User Profile Attributes in AD/LDAP Connector

For Active Directory or any other LDAP connections that use the Auth0 AD/LDAP connector, there is a mechanism for mapping User Profile attributes in the directory service to the Auth0 User Profile.  This mapping takes place when a user authenticates via such a Connection and attributes specified in this mapping are reflected in the Auth0 User Profile.

This mapping is implemented in a file called `profileMapper.js` located in the installation directory of the AD/LDAP connector.

## Mapping User Profile Attributes in SAML Assertions

If the SAML protocol is used between Auth0 and the client application, there are two places where user attribute mapping can occur.

When Auth0 is serving as a SAML Service Provider, the "Mappings" tab for a SAML connection is used to map attributes coming from an IDP to attributes in the Auth0 User Profile.
Connections -> Enterprise -> SAMLP -> {Name of Connection} -> Settings -> Mappings

When Auth0 is serving as a SAML Identity Provider, the Settings tab of Application AddOns is used to map attributes from the Auth0 User Profile to attributes in the SAML Assertion sent back to the Service Provider.
Apps/APIs -> {name of app} - Addons -> SAML2 Web App -> Settings

## User Profile with Account Linking

Users may log into an application initially via one Connection (example: a Database), and then at a later time, via another Connection (example: Facebook).  In this case, the `user_id` for the second  authentication will be different from that for the first authentication.  Auth0 provides a mechanism to link the two accounts.  If this is done, the `identities` array portion of the User Profile will have multiple elements, one for each provider for which account linking has been done.  Note that the User Profile attributes from the multiple providers are not merged.  The core User Profile attributes will be sourced from the first provider used.

Information on linking accounts and examples of profiles in this case is [here](/link-accounts).
