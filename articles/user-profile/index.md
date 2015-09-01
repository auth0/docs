# User profile

## Overview
This document explains the Auth0 User Profile, its structure and how to access and modify it. Several links are included to other documents which include additional, more detailed information.

The **User Profile** is a set of attributes about a user.  The attributes may include basic information such as first name, last name, email address, and a nickname.  The attributes may also include information from social providers such as a person's contacts or their profile picture.  In the case of employees, the attributes may include company identifiers such as an employee number, the name of the department to which an employee belongs, and groups or roles used for access control.  The amalgamation of attributes from multiple sources makes up the user profile.

## Sources of User Profile Data

As implied above, user profile attributes may come from multiple sources.  A core set of attributes will come from the service that authenticates a user.  The authentication service might be a social provider such as Facebook or LinkedIn.  Alternatively, the authentication service might be an enterprise provider, such as AD, ADFS or a SAML-compliant authentication service operated by a business or other organization.  In such a case, the user is typically acting on behalf of the business or organization and the business is the authoritative source of information for the profile data.  Additional types of authentication services are custom databases, web services and the database that is included as part of the Auth0 service.  In general, these authentication services are also called providers, authentication providers or identity providers.  In the context of the Auth0 user interface, they are called connections because Auth0 connects to them to authenticate a user.

## Normalized User Profile

Auth0 supports a wide variety of authentication providers.  Each provider may return a somewhat different set of attributes about the user and each provider may use different names for the same basic attribute, such as 'surname', 'lastname' and 'familyname'.  This would add a lot of complexity to programs but fortunately Auth0 provides a normalized user profile.  This means that Auth0 will return a basic set of information using specific attribute names so programs can rely on using those exact names to retrieve specific information such as `user_id`, `name`, `nickname`, and `picture`.  If available from the authentication provider, additional attributes such as `given_name` and `family_name` are also included in the normalized Auth0 profile.

More information on the normalized Auth0 user profile and the additional attributes returned by different providers can be found on the [Normalized User Profile](/user-profile) page.

A recent blog post also described the User Profile:
https://auth0.com/blog/2015/04/15/update-of-the-user-details-section/

## User Profile in Auth0

The user profile information returned from an authentication provider is received by Auth0 and cached in Auth0 before being passed on to the calling client application.  This cache is stored in the Auth0 database. The information in the cache that originates from a provider is refreshed from the source provider each time the user logs in. There can be additional information added to the profile that originates from other sources and the maintenance of such additional information is up to customers to implement.

The user profile information is cached in Auth0 for several reasons, including the option to implement Single Sign-On at the Auth0 layer to avoid going to the identity provider for every request, and the ability to provide some resilience if an authentication provider is temporarily unavailable. The cached profile for a user can be deleted using the Auth0 dashboard or the Auth0 API.

## Structure of User Profile Data

There are several components to the profile data in Auth0.


The structure of the user profile can be viewed by clicking on "Users" in the Auth0 dashboard and then on a particular user.  

At the top of "Details" will be the core user profile object with basic information such as name, email, country if available, latest login and a few other fields.  The core user profile object may contain additional attributes from Providers, in addition to the normalized Auth0 user profile attributes.  For example, authentication against Google returns the gender attribute, so this would be included in this case.

The user profile object then has two **metadata** sub-objects, one called `user_metadata` and one called `app_metadata`.  The metadata objects can be used to store additional user profile information to augment what comes from the identity provider.  The `user_metadata` object should be used to store user attributes, such as user preferences, that don't impact what a user can access.  The `app_metadata` object should be used for user attributes, such as a support plan, security roles, or access control groups, which can impact how an application functions and/or what the user can access.

Lastly, there is a set of attributes containing information from the identity provider to which the user has authenticated.  These attributes are specific to that identity provider.  For example, if the user authenticated with Facebook, you might see Facebook-specific fields like `cover` and `age_range`.

You will also notice a special property called `identities`, which is an array of identity providers.  It will always contain at least one identity provider and that one represents the provider that the user originally authenticated against.  However, Auth0 supports the ability for users to [link their profile to multiple identity providers](/link-accounts), and when they do, those additional identities show up in this array.  The contents of an individual identity provider object varies by provider, but will typically include a user identifier, the name of the provider, the name of the connection set up in Auth0 for that provider, and whether it is a social provider.  The full list of attributes can be seen in the Auth0 dashboard ("Users")

## Application Access to User Profile

The user profile information will be returned to a client application when it calls one of the libraries available for this purpose. The library to call will vary based on the language the application is written in as well as the functionality desired.

Applications that use the Auth0 Lock widget can use the Lock calls as described at:
* [Web interface](/libraries/lock)
* [Lock for iOS and OSX](/libraries/lock-ios)
* [Lock for Android](/libraries/lock-android)

Alternatively, node.js applications can use [auth0.js](/libraries/auth0js), a UI-less client-side library for Auth0 to trigger authentication and receive in return a user profile object.

Similar libraries exist for many other platforms.  Quick start samples for each are at:
https://auth0.com/docs

## API Access to User Profiles

Auth0 provides a REST API that allows applications and services to access and manipulate the user profile object.

There is an [API Explorer](/api/v2) that allows users to interactively explore the API, view the API calls available, the information required for each call and the information returned by each call.  The explorer allows users to try out each call in the explorer UI or via a CuRL command on the command line.   To try out one of the API commands, simply select the access needed under **Scopes** under that command, such as `update:users`, and then click on "TRY".

There is an [older version of the API](/api/v1) (v1) that is still being used by some customers today.  However, it is recommended that customers migrate to v2 (the current version), since future support for v1 will be limited.  If you're using v1 and would like to see the differences between the two version, see the [API v1 vs v2](/api/v2/changes) article.

Finally, there is an API specifically used for authentication flows. The documentation for these authentication API calls can be found [here](/auth-api).  Most of these endpoints are used by the various Auth0 SDK's and typically not your own code.  However, one endpoint that is particularly important for user profile is [`/userinfo`](/auth-api#!#get--userinfo), which  will be discussed later in this article.


## User Profile vs Tokens

In addition to the user profile object which is usually returned to a variable called "profile" in the samples above, applications can also receive one or more tokens.  The tokens contain user profile attributes represented in the form of claims. The claims are statements about user profile attributes and the token is signed by the issuer. This means that the token can be used to call APIs because the API can validate the signature on the token and if the API trusts the issuer, can use the information inside the token as a trusted representation of the user.

One of the tokens that can be returned to an application is the Auth0 `id_token`.  This is a [JSON Web Token](http://jwt.io), often abbreviated "JWT" and sometimes pronounced as “jot”. A JWT is an industry standard, URL-friendly, signed token useful for conveying information about users between web properties.  The information in the JWT is in the form of "claims" and the specific claims included in the Auth0 `id_token` are governed by a parameter to the Auth0 endpoints which return the `id_token`. For further information on controlling the claims returned in a JWT see the [Scopes](#scopes) section below.

There are three other types of tokens, namely an Auth0 access token, a 3rd party provider access token, and a refresh token. For more information on tokens and claims see: [Token Overview](tokens).

## Modification of User Profiles

The information contained in a user profile and in an `id_token` can be modified in a number of ways, as described below.

### Scopes

In the authentication calls for the Auth0 Lock or UI-less auth0.js library, there is an optional parameter that allows you to specify a scope which controls the user profile information (claims) included in the `id_token` (JWT). Examples of different scopes are discussed [here](/protocols).

### Dashboard

The user profile can also be modified through the Auth0 dashboard.  The  dashboard allows administrators to manually edit portions of the user profile for a particular user.  This mechanism can be used to alter the `user_metadata` and `app_metadata` portions of the user profile.

In the Auth0 dashboard, click on "Users", then the user to be edited, then "EDIT".  The user profile attributes within USER metadata and APP metadata can be edited by specifying profile data in JSON format with a key (attribute name) and value (value of the attribute). Pressing "SAVE" will save the information to the Auth0 cache of user profile information for the user where it will be visible by client applications integrated with Auth0. This "SAVE" will not alter information in any 3rd party authentication providers.

### API

The Auth0 API provides access to read, update and delete user profiles stored in the Auth0 database.  As with the dashboard, it does not alter data in 3rd party authentication providers such as Facebook or enterprise directories. Not all user profile attributes can be altered via the API. For example, the identities array, which contains information from 3rd party authentication providers, cannot be altered. Another example is that the password can be set via the create or update call but for security purposes, it cannot be viewed via the get or list user commands. The right side of the API explorer provides hints on the user profile attributes which can be viewed or modified for any given call.

The [`/users`](/api/v2#!/Users/get_users) endpoint is used to retrieve information about all users.  Various search criteria can be specified.

There is also [an endpoint](/api/v2#!/Users/get_users_by_id) to retrieve information about one user based on the `user_id`.  Note that the `user_id` is an internal identifier that consists of a connection name and a unique identifier for the user.  The `user_id` is different from the `id_token`.

In addition, two other endpoints are available to retrieve user profile information based on either the Auth0 `access_token` or the Auth0 `id_token`.

The [`/userinfo`](/auth-api#!#get--userinfo) endpoint takes as input the Auth0 `access_token` and returns user profile information.  This endpoint will include the results of any rules that alter the user profile.  Note that the `access_token` passed to the call must not be expired, or you will get an error.

The [`/tokeninfo`](/auth-api#!#post--tokeninfo) endpoint takes as input the Auth0 `id_token` and returns user profile information. This endpoint will return a result that does not include the results of any rules that alter the user profile. This endpoint also requires an `id_token` that is not expired.



### Creating users in custom DB

The above APIs are used for creating and managing users in the Auth0 DB.  If a custom DB is used, scripts must be written to implement lifecycle events such as Create, Login, Verify, Delete and Change Password.  Auth0 provides templates for these scripts but they must be modified as needed for the particular database and schema in use by a particular customer.

The user profile in the custom DB can be implemented with any user profile structure desired, but must be mapped in the Login call to the Auth0 normalized user profile attributes as shown in the "Login" custom DB template. The Login script can write to the `app_metadata` portion of the user profile.

The custom DB templates are accessed via
*Connections* -> *Enterprise* -> *Database* -> *Custom Database*.  Be sure to turn on the "Use my own database" toggle to enable editing the scripts.

If additional attributes need to be added to the profile, this can be done with Rules, as explained below.


### Rules

The Auth0 Rules feature is a powerful capability which allows developers to extend the core functionality of Auth0.  Rules execute after a user has been authenticated and can be used to augment the user profile.

Auth0 provides several sample rules to provide examples of how to achieve certain results.  In the Auth0 dashboard, these samples can be viewed by clicking on "Rules" and "NEW RULE".  There are several samples in the "ENRICH PROFILE" section that show how to add user profile attributes.

#### Persistent vs Transient profiles

The "ADD ATTRIBUTES TO A USER FOR SPECIFIC CONNECTION" sample shows how to add attributes to a user profile for a particular login transaction.  These attributes will not be persisted in the cached user profile, so will not be visible to any other authentication transactions.

The "ADD PERSISTENT ATTRIBUTES TO THE USER" sample shows how to use the updateUserMetadata call within a rule to persist the altered user profile data to the cache of the user's profile data stored in the Auth0 database. This mechanism can be used to alter the `user_metadata` section of the user profile.

The "SET ROLES TO A USER" sample shows how to use the updateAppMetadata call within a rule to persist changes to the `app_metadata` section of the user profile to the cached user profile in the Auth0 database.

The altered `user_metadata` and `app_metadata` information that is written to the Auth0 user profile will be visible by subsequent authentication transactions. Mechanisms for viewing user profile data that do not occur in the context of an authentication transaction, such as viewing profile information in the Auth0 dashboard, will not show the results of modifications made in Rules. A final caveat is that as with API calls, altering the user profile in Auth0 does not alter data in 3rd party authentication providers.

More info:

* [Rules](/rules)
* [User profile metadata in rules](/rules/metadata-in-rules)
* [Altering SAML authentication assertion attributes/claims for a SAML app](https://github.com/auth0/rules/blob/master/rules/saml-attribute-mapping.md)

### When Rules are used and when they are not

The impact of rules which alter user profile information will be visible in some situations but not in others.  The results of rules will be visible when the profile is viewed or accessed in the context of a user's login transaction.  If a client application calls an Auth0 library in the context of a user session, the SDK call will return the user profile including any modifications made within rules.  This also holds true for use of the /userinfo endpoint.

When the profile is viewed outside the context of the user login transaction, the results of rules will not be included.  This is the case when using APIv2, the /tokeninfo endpoint or the Auth) Dashboard.

## Mapping user profile attributes in AD/LDAP connector

For Active Directory or any other LDAP connections that use the Auth0 AD/LDAP connector, there is a mechanism for mapping user profile attributes in the directory service to the Auth0 user profile.  This mapping takes place when a user authenticates via such a connection and attributes specified in this mapping are reflected in the Auth0 user profile.

This mapping is implemented in a file called profileMapper.js located in the installation directory of the AD/LDAP connector.

## Mapping user profile attributes in SAML assertions

If the SAML protocol is used, there are two places where user attribute mapping can occur.

When Auth0 is serving as a SAML Service Provider, the "Mappings" tab for a SAML connection is used to map attributes coming from an IDP to attributes in the Auth0 user profile.
Connections -> Enterprise -> SAMLP -> {Name of Connection} -> Settings -> Mappings

When Auth0 is serving as a SAML Identity Provider, the Settings tab of Application AddOns is used to map attributes from the Auth0 user profile to attributes in the SAML Assertion sent back to the Service Provider.
Apps/APIs -> {name of app} - Addons -> SAML2 Web App -> Settings


## User profile with account linking:

Users may log into an application initially via one authentication provider, and then at a later time, via another authentication provider.  In this case, the `user_id` for the second  authentication will be different from that for the first authentication.  Auth0 provides a mechanism to link the two accounts.  If this is done, the identities array portion of the user profile will have multiple elements, one for each provider for which account linking has been done.  Note that the user profile attributes from the multiple providers are not merged.  The core user profile attributes will be sourced from the first provider used.  

Information on linking accounts and examples of profiles in this case is [here](/link-accounts).


More information on the protocols is [here](/protocols).


