---
title: Why you should always use access tokens to secure an API
description: Explains the differences between access token and ID token and why the later should never be used to secure an API.
---
# Why you should always use access tokens to secure an API

<%= include('../_includes/_pipeline2') %>

There's a lot of confusion between **OpenID Connect** and **OAuth 2.0**, especially when it comes to determining which option is the best for a particular use case. As such, many developers publish insecure applications that compromise their users' data.

This article includes:

* A high-level overview of each protocol;
* Information about the tokens issued by each protocol;
* Suggestions on when you should use which protocol

We'll wrap things up with a discussion of why you should always secure an API with an [access token](/tokens/access-token), *not* an [ID token](/tokens/id-token).

## Two complementary specifications

::: note
**TL;DR**
OpenID Connect tells you who somebody is. OAuth 2.0 tells you what somebody is allowed to do.
:::

OAuth 2.0 is used to __grant authorization__. It allows you to authorize Web App A access to your information from Web App B without requiring you to share your credentials.

OAuth 2.0 was built with _only_ authorization in mind and doesn't include any authentication mechanisms. In other words, OAuth 2.0 doesn't give the Authorization Server any way of verifying who the user is.

OpenID Connect builds on OAuth 2.0. It enables you, as the user, to verify your identity and to give some basic profile information without sharing your credentials.

### An example of how OpenID Connect and OAuth 2.0 are used

For example, let's say that you use a to-do application that allows you to log in using your Google credentials. You are asked to provide permission for the to-do app to read and write to your Google Calendar. Then, with this app, you can push to-do items, such as calendar entries, to your Google Calendar.

The portion of the login process where you "prove" your identity is implemented using OpenID Connect, while the part of the login process where you authorize the to-do application to modify your Google Calendar by adding entries is implemented using OAuth 2.0. 

### The role of tokens

You may have noticed that we've used the phrase **without sharing your credentials** several times in the paragraph above. How does this work?

Essentially, the two protocols operate by sharing **tokens**. Tokens are items that possess sufficient information about what you can do or who you are while not being overtly explicit and identifying.

OpenID Connect issues what's called an **ID token**, while OAuth 2.0 issues an **access token**.

## How to use tokens

The **ID token** is a [JSON Web Token (JWT)](/jwt), and it is meant for client use only. For example, in our calendar example above, Google sends an ID token to the to-do app that tells the app who you are. The app then parses [the token's contents](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) and uses this information (including details like your name and your profile picture) to customize your user experience.

::: warning
Be sure to [validate an ID token](/tokens/id-token#validate-an-id-token) before using the information it contains!

You can use a [library](https://jwt.io/#libraries-io) to help with this task.
:::

Conversely, the **access token** (which isn't necessarily a JWT), is meant for use by an API.

The access token's purpose is to inform the API that the bearer of the token has been authorized to access the API and perform a predetermined set of actions (which is specified by the **scopes** granted).

In the Google/to-do app example above, recall that Google sent an access token to the to-do app after you logged in and provided consent for your to-do app to read/write to your Google Calendar.

Whenever the to-do app wants to write to your Google Calendar, it will send a request to the Google Calendar API, making sure to include the access token in the HTTP **Authorization** header.

::: note
Your clients should treat access tokens as opaque strings, since they are meant for APIs. Your client should *not* attempt to decode them or expect to receive tokens in a particular format.
:::

## How NOT to use each token

Now that we've seen some ways in which we can use tokens, let's talk about when they should **not** be used.

* **Access tokens should never be used for authentication.** Access tokens hold no authenticating information about the user, and it cannot tell us if the user has authenticated. The only identifying user the access token possesses is the user ID, located in the **sub** claims.

* **ID tokens should not be used to gain access to an API**. Each token contains information for the intended audience (which is usually the recipient). Per the OpenID Connect specification, the audience (indicated by the **aud** claim) of the ID token must be the *client ID* of the client making the authentication request. If this is not the case, you should not trust the token.

  Conversely, an API expects a token with the **aud** value to equal the API's unique identifier. Therefore, unless you maintain control over both the client and the API, sending an ID token to an API will generally not work.
  
  Furthermore, the ID token is signed with a secret known only to the client itself. If an API were to accept an ID token, it would have no way of knowing if the client has modified the token (such as adding more scopes) and resigned it.

## Compare the tokens

To better clarify the concepts we covered above, let's look at the contents of some sample ID and access tokens.

This is what our sample ID token looks like:

```json
{
  "iss": "http://${account.namespace}/",
  "sub": "auth0|123456",
  "aud": "${account.clientId}",
  "exp": 1311281970,
  "iat": 1311280970,
  "name": "Jane Doe",
  "given_name": "Jane",
  "family_name": "Doe",
  "gender": "female",
  "birthdate": "0000-10-31",
  "email": "janedoe@example.com",
  "picture": "http://example.com/janedoe/me.jpg"
}
```

This token is meant to **authenticate the user to the client**. The audience (the **aud** claim) of the token is set to the client's identifier, which means that only this specific client should consume this token.

Let's look at the contents of an **access token**:

```json
{
  "iss": "https://${account.namespace}/",
  "sub": "auth0|123456",
  "aud": [
    "my-api-identifier",
    "https://${account.namespace}/userinfo"
  ],
  "azp": "${account.clientId}",
  "exp": 1489179954,
  "iat": 1489143954,
  "scope": "openid profile email address phone read:appointments email"
}
```

This token is meant for __authorizing the user to the API__. As such, the token is completely opaque to clients -- the client should not care about the contents of this token, decode it, or depend on a particular token format. 

The access token does not contain any information about the user besides their ID (located in the **sub** claim); it only contains authorization information about which actions the client is allowed to perform using the API (detailed in the **scope** claim).

In many cases, you might find it useful to retrieve additional user information at the API, so the token is also valid for call the **/userinfo** API, which returns the user's profile information. The intended audience (indicated by the **aud** claim) is either the API identifier (such as **https://my-api-identifier**) or the **/userinfo** endpoint (such as **https://${account.namespace}/userinfo**).

## Keep reading

::: next-steps
* [The problem with OAuth for Authentication](http://www.thread-safe.com/2012/01/problem-with-oauth-for-authentication.html)
* [User Authentication with OAuth 2.0](https://oauth.net/articles/authentication/)
* [OAuth 2.0 Overview](/protocols/oauth2)
* [OpenID Connect Overview](/protocols/oidc)
* [Obtaining and Using Access Tokens](/tokens/access-token)
* [Obtaining and Using ID Tokens](/tokens/id-token)
:::