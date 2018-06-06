---
description: An overview of the SAML configuration process
tags:
  - saml
  - saml-configuration
---

# SAML Configuration

SAML-based federation involves two parties:

1. An **identity provider** (IdP): authenticates users and provides to Service Providers an Authentication Assertion if successful;
2. A **service provider** (SP): relies on the Identity Provider to authenticate users.

Auth0 supports the SAML protocol and can serve as the identity provider, the service provider, or both.

## SAML Identity Providers

Some applications (such as SalesForce, Box, and Workday) allow users to authenticate against an external IdP using the SAML protocol. You can then integrate the application with Auth0, which serves as the application's SAML IdP.

Application users will be redirected to Auth0 to log in, and Auth0 can authenticate them using any backend authentication connection, such as an LDAP directory, a database, or another SAML IdP or Social Provider.

Once the user is authenticated, Auth0 returns a SAML assertion to the application that indicates such.

![](/media/articles/saml/saml-configuration/saml-case2.png)

## SAML Service Providers

Applications, especially custom ones, can authenticate users against an external IdP using protocols such as OpenID Connect or OAuth 2.0. However, you might want to leverage an enterprise SAML provider for authentication, even if you wrote your application to utilize either protocol.

![](/media/articles/saml/saml-configuration/saml-case1.png)

## Auth0 as the SAML Service and Identity Providers

You may opt to use Auth0 as both the SAML Service Provider **and** SAML Identity Provider.

![](/media/articles/saml/saml-configuration/saml-case3.png)

## Configuration

The following documentation cover the different aspects of SAML configuration:

* [Configure Auth0 as a Service Provider](/protocols/saml/saml-configuration/auth0-as-service-provider)
* [Configure Auth0 as an Identity Provider](/protocols/saml/saml-configuration/auth0-as-identity-provider)
* [Configure Auth0 as Both Service and Identity Provider](/protocols/saml/saml-configuration/auth0-as-identity-and-service-provider)
* [SAML Design Considerations](/protocols/saml/saml-configuration/design-considerations)
* [Supported SAML Options and Bindings](/protocols/saml/saml-configuration/supported-options-and-bindings)
* [Special Configuration Scenarios](/protocols/saml/saml-configuration/special-configuration-scenarios)
* [Customize SAML Assertions](/protocols/saml/saml-configuration/saml-assertions)
* [Select Between Multiple Identity Providers](/protocols/saml/saml-configuration/selecting-between-multiple-idp)
* [Logout](/protocols/saml/saml-configuration/logout)
* [Deprovision Users](/protocols/saml/saml-configuration/deprovision-users)
* [Troubleshoot](/protocols/saml/saml-configuration/troubleshoot)
