---
title: Connection Settings Best Practices
description: Learn about recommended identity provider connection settings in Auth0.
topics:
  - best-practices
  - configuration
  - settings
  - connection
contentType:
    - reference
useCase:
  - best-practices
  - connection
  - connection-settings
---
# Connection Settings Best Practices

Here are some best practices for configuring [connections](/connections). Before you set up connections, take a moment to review [what connections are](/connections) and [the basics of authentication](/application-auth) for your application type.

## Use your credentials for social connections

Auth0 provides [default credentials](/connections/social/devkeys) for [social connections](/connections/identity-providers-social) to help you get started. You should replace these temporary credentials with your own to avoid restrictions.

## Review requested data

You should review the data you are requesting from each social connection. Users must grant consent for the requested data. Requesting a lot of unnecessary data may result in users declining the authorization request out of privacy concerns.

## Set password policy for database connections

Configure the [password policy](/connections/database/password-strength) for your [Auth0 database connections](/connections/database) so created users have strong passwords. You can configure the password policy in the [database connection settings](${manage_url}/#/connections/database/) on the dashboard or with the [Auth0 Management API](/api/management/v2/#!/Connections/patch_connections_by_id).

The password policy applies to password resets performed with the <dfn data-key="universal-login">Universal Login</dfn> [Page](/hosted-pages/login) as well as the [Auth0 Management API](/api/management/v2/).

## Disable user signup if it's not appropriate for each database connection

In your database connection settings, specify if self-service user signups should be enabled. If you enabled this during development, check if you should disable it on production tenants.

Only enable this setting for production tenants if you allow end users to sign up in a self-service manner. If self-service signup is not allowed, disable the feature. You can then add users to the database connection with the Auth0 Management API.

## Review applications enabled for each connection

For each connection, review the list of allowed applications. Make sure there are no unintended authentication paths into an application. By default, new applications may have all of your tenant's connections enabled, which may not be appropriate.

## Use RSA-SHA256 for SAML connections

Configure any <dfn data-key="security-assertion-markup-language">SAML</dfn> connections to sign requests and use RSA-SHA256 as the signature algorithm. This ensures the remote SAML Identity Provider can validate whether the authentication requests came from a legitimate application or not.
