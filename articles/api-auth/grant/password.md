---
description: Describes how to call APIs from highly trusted clients using the Resource Owner Password Grant.
crews: crew-2
---

# Calling APIs from Highly Trusted Clients

Highly trusted mobile apps and Client-side web apps can use the **Resource Owner Password Grant** to access an API. In this flow the end-user is asked to fill in credentials (username/password) typically using an interactive form. This information is later on sent to the Client and the Authorization Server. It is therefore imperative that the Client is absolutely trusted with this information.

## Overview

The **Resource Owner Password Grant** (defined in [RFC 6749, section 4.3](https://tools.ietf.org/html/rfc6749#section-4.3)) can be used directly as an authorization grant to obtain an access token, and optionally a refresh token. This grant should only be used when there is a high degree of trust between the user and the client and when other authorization flows are not available.

This grant type can eliminate the need for the client to store the user credentials for future use, by exchanging the credentials with a long-lived access token or refresh token.

![Resource Owner Password Grant](/media/articles/api-auth/password-grant.png)

 1. The Resource Owner enters the credentials into the client application
 2. The client forwards the Resource Owner's credentials to the Authorization Server
 3. The Authorization server validates the information and returns an `access_token`, and optionally a `refresh_token`
 4. The Client can use the `access_token` to call the Resource Server on behalf of the Resource Owner

### Realm Support

A extension grant that offers similar functionality with the **Resource Owner Password Grant**, including the ability to indicate a specific realm, is the `http://auth0.com/oauth/grant-type/password-realm`.

Realms allow you to keep separate user directories and specify which one to use to the token endpoint. For example, you may have an application where both employees and customers can log in but their credentials are kept in separate user directories. You can present a user interface with a dropdown containing "Employees" or "Customers" as realms (which would be connections in [Auth0 dashboard](${manage_url})). The realm value, along with the username and password credentials, will be submitted to the token endpoint. Auth0 will use the realm value to determine which directory (connection) to use when verifying the password.

For more information on how to implement this extension grant refer to [Executing a Resource Owner Password Grant > Realm Support](/api-auth/tutorials/password-grant#realm-support).

### Scopes

Due to the implied trust in these grants (a user providing his or her password to a client), the `access_token` returned will include all of the available scopes defined for the audience API. A client can request a restricted set of scopes by using the `scope` parameter, or you can restrict the returned scopes by using a [rule](#customizing-the-returned-token).

### Rules

[Rules](/rules) will run for the Password Exchange (including the Password Realm extension grant). There are two key differences in the behavior of rules in these flows:

- Redirect rules won't work. If you try to do a [redirect](/rules/redirect) by specifying `context.redirect` in your rule, the authentication flow will return an error.
- If you try to do MFA by specifying `context.multifactor` in your rule, the authentication flow will return an error. MFA support is coming soon, as noted below.

If you wish to execute special logic unique to the Password exchange, you can look at the `context.protocol` property in your rule. If the value is `oauth2-password`, then this is the indication that the rule is running during the password exchange.

#### Customizing the returned tokens

Inside a rule, you can change the returned scopes of the `access_token` and/or add claims to it (and the `id_token`) with code like this:

```javascript
function(user, context, callback) {

  // add custom claims to access token and ID token
  context.accessToken['http://foo/bar'] = 'value';
  context.idToken['http://fiz/baz'] = 'some other value';

  // change scope
  context.accessToken.scope = ['array', 'of', 'strings'];

  callback(null, user, context);
}

```

::: panel-warning Namespacing Custom Claims
You must properly namespace your custom claims with URI format to avoid conflicting with spec claims.
:::

## MFA Support

MFA support is coming soon.

## Use Case

- Allow the Client to make calls to the Resource Server on behalf of the Resource Owner
- The Client is a highly trusted application and other authorization flows are not available

## Tutorials

 - [Configuring your tenant for API Authorization](/api-auth/tutorials/configuring-tenant-for-api-auth)
 - [Executing a Resource Owner Password Grant](/api-auth/tutorials/password-grant)
