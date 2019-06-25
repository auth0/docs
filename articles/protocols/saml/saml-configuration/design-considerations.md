---
description: Things to consider when designing your SAML integration
topics:
  - saml
contentType:
  - concept
useCase:
  - add-idp
---

# SAML Design Considerations

Regardless of how you implement <dfn data-key="security-assertion-markup-language">SAML</dfn> <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn>, it's important to consider:

* Which system(s) will serve as the authoritative source for user profile information if there's ever a conflict between two or more sources;
* What user profile attributes each application needs;
* How user profile information will be distributed to the systems that need it.

## Considerations for Using Auth0 as Service Provider

* If Auth0 serves as the Service Provider in a SAML federation, Auth0 can [route authentication requests to an Identity Provider](/hrd) without already having an account pre-created for a specific user. Using the assertion returned by the identity provider, Auth0 can capture information needed to create a user profile for the user (this process is sometimes called just-in-time provisioning).

* Even though Auth0 doesn't require pre-created user accounts prior to the authentication process, the application integrated with Auth0 might. If this is the case, you have several options when it comes to handling this:

  * After the identity provider creates the user, you can use an out-of-band process can create the accompanying user in the application (or Auth0) and add any user profile attributes required by the application. If, after authentication, any attributes are missing in the profile, the application can obtain them from the appropriate source and store them in the Auth0 user profile. The additonal attributes are then sent to the application (in addition to any added by the identity provider) the next time the user logs in.

  * You can use an Auth0 [rule](/rules) to call an API to retrieve any missing information and dynamically add it to the Auth0 profile (which is then returned to the application). Rules execute after successful authentication, and your application can retrieve profile attributes each time *or* you can save the attributes to the Auth0 profile.

  * Auth0 can pass the basic profile information from the identity provider to the application, which then retrieves any missing information from another source. With the two sets of information, the application creates a local user profile.

* You can specify email domains as part of the Auth0 SAMLP Connection configuration to control the IDP that handles a select group of users. For example, if you add email domain `example.com` to the Auth0 SAMLP Connection configuration for Company X, all users with emails with the `example.com` domain get handled by the specific IDP for Company X.

## Considerations for Using Auth0 as Identity Provider

If Auth0 is serving as the Identity Provider in a SAML federation, user accounts may be created multiple ways:

* Using a back-end authentication system, such as an LDAP directory, a database, or another SAML identity provider;
* Using the [Auth0 Management Dashboard](${manage_url}/#/users);
* Calling the [Auth0 Management API](/api/management/v2#!/Users/post_users);
* Implementing self-service user signup.

If your application is written to retrieve user profile information from a local store, you'll need to create the local profile after the accounts have been created in Auth0. Some of the ways you might do this include:

 * An out-of-band process creating user profiles in the application;
 * An Auth0 [rule](/rules) that executes on first login that calls an application API to create the user profile in the application;
 * Modifying the application to create user profiles dynamically, based on information in the SAML assertion.
