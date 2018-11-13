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

# Example Use Cases

These use cases build off of our tutorial on how to [Implement the Mobile Login Flow](/api-auth/tutorials/mobile-login-flow/overview-mobile-login-flow).

## Request the User's Name and Profile Picture

In addition to the usual user authentication, this example shows how to request additional user details.

To request the user's name and picture, you need to add the appropriate scopes when [authorizing the user](/api-auth/tutorials/mobile-login-flow/authorize-user):

https://${account.namespace}/authorize?
    scope=openid%20name%20picture&
    response_type=code&
    client_id=${account.clientId}&
    code_challenge=CODE_CHALLENGE&
    code_challenge_method=S256&
    redirect_uri=${account.namespace}/mobile

Now, when you [request tokens](/api-auth/tutorials/mobile-login-flow/request-tokens), your ID Token will contain the requested name and picture claims. When you [decode the ID Token](), it will look similar to:

{
  "name": "auth0user@...",
  "picture": "https://example.com/profile-pic.png",
  "iss": "https://auth0user.auth0.com/",
  "sub": "auth0|581...",
  "aud": "xvt...",
  "exp": 1478113129,
  "iat": 1478077129
}

Request a User Log In with GitHub
You can send a user directly to the GitHub authentication screen by passing the connection parameter and setting its value to github.

:::panel Logins with Social Providers While this example shows how to log in users via GitHub, you can just as easily request that a user log in with other Social providers, such as Google or Facebook.

To do this, configure the appropriate Connection in the Auth0 Dashboard and change the connection value of the call to /authorize to the name of the Connection (google-oauth2 for Google, facebook for Facebook, and so on). You can get the Connection's name from the Settings tab of the Connections page.

Read more:

Identity Providers Supported by Auth0
Social Login using the Authentication API :::
https://${account.namespace}/authorize?
    scope=openid%20name%20picture&
    response_type=code&
    client_id=${account.clientId}&
    code_challenge=CODE_CHALLENGE&
    code_challenge_method=S256&
    redirect_uri=https://${account.namespace}/mobile&
    connection=github
After the user submits the request, the app receives an HTTP 302 response with a URL containing the authorization code at the end: https://${account.namespace}/callback?code=AUTHORIZATION_CODE

Using the authorization code, you can obtain the ID Token by making a POST call to the tokens endpoint.

{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\":\"authorization_code\",\"client_id\": \"${account.clientId}\",\"code_verifier\": \"YOUR_GENERATED_CODE_VERIFIER\",\"code\": \"YOUR_AUTHORIZATION_CODE\",\"redirect_uri\": \"${account.namespace}/mobile\" }"
  }
}
If all goes well, you'll receive an HTTP 200 response with the following payload:

{
  "access_token":"eyJz93a...k4laUWw",
  "refresh_token":"GEbRxBN...edjnXbL",
  "id_token":"eyJ0XAi...4faeEoQ",
  "token_type":"Bearer",
  "expires_in":86400
}
You can pull the user's name, profile picture, and email address from the name, picture, and email claims of the returned ID Token. Note that the sub claim contains the user's unique ID as returned from GitHub:

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


-------

## Optional: Customize the Tokens

<%= include('../../_includes/_api-auth-customize-tokens') %>

If you wish to execute special logic unique to the Authorization Code (PKCE) grant, you can look at the `context.protocol` property in your rule. If the value is `oidc-basic-profile`, then the rule is running during the Authorization Code (PKCE) grant.

## Sample application

For an example implementation, see the [Mobile + API](/architecture-scenarios/application/mobile-api) architecture scenario.

This is a series of tutorials that describe a scenario for a fictitious company, which wants to implement a mobile app that its employees can use to send timesheets to the company's Timesheet API. The tutorials are accompanied by a code sample that you can access in [GitHub](https://github.com/auth0-samples/auth0-pnp-exampleco-timesheets).
