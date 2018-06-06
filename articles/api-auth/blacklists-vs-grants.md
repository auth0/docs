---
description: This document covers blacklists vs. grants when it comes handling tokens.
---

# Blacklists and Application Grants

Let's say that you're using a machine-to-machine [application](/application) to access your API. You have a partner that calls your API, and at the end of your existing contract, you and your partner decide not to renew your partnership. As such, you now want to remove your partner's access to your API. The issue, however, is that you've given your partner an [Access Token](/tokens/access-token) that lasts for a month.

* What can you do in this situation?
* How might you configure your Auth0 environment to make such situations easier to handle in the future?

In this article, we'll cover two methods for revoking access to the protected resource:

* [Blacklisting the Access Token](#blacklists)
* [Revoking the application grant](#application-grants)

We will then compare the two methods and provide our recommendations.

## Blacklists

Let's say that you grant access to your API to anyone in possession of the appropriate Access Token. One method of revoking access to a user is to blacklist their token so that it can no longer be used.

::: note
Please see the Auth0 blog for an in-depth treatment on [Blacklisting JSON Web Token API Keys](https://auth0.com/blog/blacklist-json-web-token-api-keys/).
:::

Auth0-issued tokens are [JWTs](/jwt), so you can set the JWT ID, or `jti`, for the token by including it in the token payload's `jwtid` field. With the `jti` in hand, you can make the appropriate `POST` call to the Management API's [blacklist a token endpoint](/api/management/v2#!/Blacklists/post_tokens). You'll need to provide the JWT's `aud` and `jti` claims. 

::: panel Add a JWT ID
You can add `jti` via a [rule](/rule). Here's a simple example using UUID:

```js
function (user, context, callback) {
  user.jti = require('uuid').v4();
  callback(null, user, context);
}
```
:::

Your call might look something like this:

```text
curl -H "Authorization: Bearer {JWT_API_KEY}"
-X POST
-H "Content-Type: application/json"
-d '{"aud":"u6nnAxGVjbBd8etXjj554YKGAG5HuVrp","jti":"test-token"}'
https://login.auth0.com/api/v2/blacklists/tokens
```

## Application Grants

The main issue in this scenario is the length of time for which the API Access Token is valid: one month. 

By default, Auth0 issues Access Tokens that last for 24 hours. Setting the token's lifetime to 24 hours means that your partner must repeat the client credentials exchange (or whichever grant you've implemented) to obtain a new Access Token every 24 hours. To deny access to your partner due to the expiration of your contract, you can simply delete the application grant so that when their existing token expires, they cannot request a new one.

You can change the lifetime of a token by setting the `token_lifetime` option. The specific lifetime appropriate to your use case will vary, but we recommend setting this value to be as short as possible. A good starting point for determining this value would be the window you consider allowable for the delay between deleting the grant and final use of the API.

### Delete an Application Grant

To delete an application grant, make the appropriate `DELETE` call to the Management API's [Delete an Application Grant endpoint](/api/management/v2#!/Client_Grants/delete_client_grants_by_id). 

::: note
For additional information, please see our docs on [APIs](/apis).
:::

As part of the call, you'll need to specify the ID of the application grant you want to delete, which you can obtain via the Management API's [Get all Application Grants endpoint](/api/management/v2#!/Client_Grants/get_client_grants) or the Management Dashboard by going to *APIs > Machine to Machine Applications* and expanding the hidden information for the specific machine to machine application in question.

## Blacklists vs. Application Grants

For you to blacklist Access Tokens to revoke access, you'll need to identify and blacklist **every** token you've ever assigned to the company whom you no longer want accessing the API. This is because the Auth0 API asks for the tokens' `jti` values to compile the blacklist. As the number of tokens issued grows larger and larger, this method gets more and more difficult to implement and execute correctly.

On the other hand, configuring your application grant so that the tokens you issue last for only a short period means that when it comes time for you to revoke access to a protected resource, you can simply delete the grant. At this point, the party with the Access Token only has a limited period between when you delete the grant and the token's expiration to make additional API requests. Because this is the easier (and safer) option to implement, we recommend you deny access to your APIs and other protected resources by revoking application grants.
