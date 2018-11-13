---
description: Explore example use cases while implementing the mobile login flow.
toc: false
topics:
  - api-authentication
  - oidc
  - authorization-code
  - pkce
  - mobile-login-flow
contentType: tutorial
useCase:
  - secure-api
  - call-api
  - add-login
---

# Sample Use Cases

These use cases build off of our tutorial on how to [Implement the Mobile Login Flow](/api-auth/tutorials/mobile-login-flow/overview-mobile-login-flow).

## Request the User's Name and Profile Picture

In addition to the usual user authentication, this example shows how to request additional user details, such as name and picture.

To request the user's name and picture, you need to add the appropriate scopes when [authorizing the user](/api-auth/tutorials/mobile-login-flow/authorize-user):

```text
https://${account.namespace}/authorize?
    scope=openid%20name%20picture&
    response_type=code&
    client_id=${account.clientId}&
    code_challenge=CODE_CHALLENGE&
    code_challenge_method=S256&
    redirect_uri=${account.namespace}/mobile
```

Now, when you [request tokens](/api-auth/tutorials/mobile-login-flow/request-tokens), your ID Token will contain the requested name and picture claims. When you [decode the ID Token](/tokens/id-token#id-token-payload), it will look similar to:

```json
{
  "name": "auth0user@...",
  "picture": "https://example.com/profile-pic.png",
  "iss": "https://auth0user.auth0.com/",
  "sub": "auth0|581...",
  "aud": "xvt...",
  "exp": 1478113129,
  "iat": 1478077129
}
```

## Request a User Log In with GitHub

In addition to the usual user authentication, this example shows how to send users directly to a social identity provider, such as GitHub. For this example to work, you will first need to [configure the appropriate connection in the Auth0 Dashboard](${manage_url}/#/connections/social) and get the connection name from the **Settings** tab.

To send users directly to the GitHub login screen, you need to pass the `connection` parameter and set its value to the connection name (in this case, `github`) when [authorizing the user](/api-auth/tutorials/mobile-login-flow/authorize-user):

```text
https://${account.namespace}/authorize?
    scope=openid%20name%20picture&
    response_type=code&
    client_id=${account.clientId}&
    code_challenge=CODE_CHALLENGE&
    code_challenge_method=S256&
    redirect_uri=https://${account.namespace}/mobile&
    connection=github
```

Now, when you [request tokens](/api-auth/tutorials/mobile-login-flow/request-tokens), your ID Token will contain a `sub` claim with the user's unique ID returned from GitHub. When you [decode the ID Token](/tokens/id-token#id-token-payload), it will look similar to:

```json
{
  "name": "John Smith",
  "picture": "https://avatars.example.com",
  "email": "jsmith@...",
  "email_verified": true,
  "iss": "https://auth0user.auth0.com/",
  "sub": "github|100...",
  "aud": "xvt...",
  "exp": 1478114742,
  "iat": 1478078742
}
```

For a list of possible connections, see [Identity Providers Supported by Auth0](/identityproviders).


## Customize Tokens

You can use [Rules](/rules) to change the returned scopes of Access Tokens and/or add claims to Access and ID Tokens. To do so, add the following rule to your API:

function(user, context, callback) {

  // add custom claims to Access Token and ID Token
  context.accessToken['http://foo/bar'] = 'value';
  context.idToken['http://fiz/baz'] = 'some other value';

  // change scope
  context.accessToken.scope = ['array', 'of', 'strings'];

  callback(null, user, context);
}

::: panel-warning Namespacing Custom Claims 
Auth0 returns profile information in a structured claim format as defined by the OIDC specification. This means that custom claims added to ID Tokens or Access Tokens must conform to a namespaced format to avoid possible collisions with standard OIDC claims. For example, if you choose the namespace https://foo.com/ and you want to add a custom claim named myclaim, you would name the claim https://foo.com/myclaim, instead of myclaim. 
:::


If you wish to execute special logic unique to the Authorization Code (PKCE) grant, you can look at the `context.protocol` property in your rule. If the value is `oidc-basic-profile`, then the rule is running during the Authorization Code (PKCE) grant.

## Sample application

For an example implementation, see the [Mobile + API](/architecture-scenarios/application/mobile-api) architecture scenario.

This is a series of tutorials that describe a scenario for a fictitious company, which wants to implement a mobile app that its employees can use to send timesheets to the company's Timesheet API. The tutorials are accompanied by a code sample that you can access in [GitHub](https://github.com/auth0-samples/auth0-pnp-exampleco-timesheets).
