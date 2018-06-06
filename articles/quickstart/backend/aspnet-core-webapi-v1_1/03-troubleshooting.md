---
title: Troubleshooting
name: Shows how to troubleshoot the JWT middeware configuration
description: This document will help you troubleshoot your configuration if you get 401 (Unauthorized) response from your API.
budicon: 500
tags:
    - quickstart
    - backend
    - aspnetcore
    - web-api
---

If you configured the JWT middleware correctly, you will be able to get proper responses from your API when you make requests. However, in the case where you get a 401 (Unauthorized) response from your API, it is because the configuration of your JWT middleware does not match with the JWT which was passed.

This document will help you troubleshoot your JWT middleware configuration.

## How does a token get validated?

In terms of validating a JWT, there are various things to consider:

1. **Is the token well formed?** In other words is this token conforming to the structure of a JSON Web Token (JWT)? To get more information on the structure of a JWT, please refer to [this section on the structure of a JWT](/jwt#what-is-the-json-web-token-structure-)

2. **Has the token been tampered with?** The last part of a JWT is the signature. The signature is used to verify that the token was in fact signed by the sender and not altered in any way.

3. **Has the token been received in its validity period?** JWTs are only valid for a specified time period (as expressed in the `exp` claim).

4. **Is the token coming from the intended Authority?** This consists of 2 parts

    * **Signature Verification**: Can we confirm that the JWT is correctly signed using the key issued by the issuing authority?

    * **Issuer Value**: The Issuer is defined in the `iss` claim. Once again does this claim match up with what your application expects?

5. **Is the token intended for the current application?** So does the `aud` claim of the JWT match with what your application is expecting?

## Inspecting a token

A quick way to inspect a JWT is by using the [JWT.io](https://jwt.io/) website. It has a handy debugger which allows you to quickly check that a JWT is well formed, and also inspect the values of the various claims.

![Debugging a JWT on JWT.io](/media/articles/server-apis/aspnet-core-webapi/jwt-io-debugger-rs256.png)

In the screenshot above you can see that the token was signed using the **RS256** algorithm. The **Issuer** of the token is **https://jerrie.auth0.com/**, and the **Audience** is **https://rs256.test.api**.

So in other words these values in your JWT middleware registration must match **exactly** - including the trailing slash for the Issuer, such as

```csharp
var options = new JwtBearerOptions
{
    Audience = "https://rs256.test.api",
    Authority = "https://jerrie.auth0.com/"
};
app.UseJwtBearerAuthentication(options);
```

For a token signed using HS256, the debugger view will look a little different:

![Debugging a JWT on JWT.io](/media/articles/server-apis/aspnet-core-webapi/jwt-io-debugger-hs256.png)

In the screenshot above you can see that the token was signed using the **HS256** algorithm. The **Issuer** of the token is **https://jerrie.auth0.com/**, and the **Audience** is **https://hs256.test.api**.

In this case the middleware needs to be configured as follows:

```csharp
var options = new JwtBearerOptions
{
    TokenValidationParameters =
    {
        ValidIssuer = "https://jerrie.auth0.com/",
        ValidAudience = "https://hs256.test.api",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("your api secret"))
    }
};
app.UseJwtBearerAuthentication(options);
```

## Using the log files to debug configuration issues

The easiest way to debug potential configuration issuer is by inspecing the log files for your application. For more information please refer to the [Logging in ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/logging) document.

For this document we will run the application from the command line, and inspect the console log output.

### 1. Are you actually passing the JWT in the Authorization header?

The first thing is to ensure that you actually pass along the JWT as a Bearer token in the Authorization header of the request.

If you do not, you will see the following warning:

![Not specifying an Authorization Header](/media/articles/server-apis/aspnet-core-webapi/troubleshoot-no-authorization-header.png)

The relevant warning message to look for is the following:

```text
Authorization failed for the request at filter 'Microsoft.AspNetCore.Mvc.Authorization.AuthorizeFilter'
```

To resolve this issue, ensure that your send the JWT as a bearer token in the Authorization header.

## 2. Did you configure the JWT middleware for the correct signing algorithm?

Another common mistake is that your tokens are signed using the HS256 signing algorithm, but your middleware is configured for RS256 - or vice versa.

In the following screenshot you can see that I still get the "Authorization failed..." warning message, but you will also notice that there is an informational message above that with more information:

![Wrong Signature Configured](/media/articles/server-apis/aspnet-core-webapi/troubleshoot-wrong-signature-rs256.png)

The relevant error message to look for is the following:

```text
System.ArgumentException: IDX10634: Unable to create the SignatureProvider.

SignatureAlgorithm: 'HS256', SecurityKey: 'Microsoft.IdentityModel.Tokens.RsaSecurityKey' is not supported.
```

So the error tells me that the JWT is signed using HS256, but this algorithm is not configured, because my middleware was configured to expect RS256 tokens.

In the case where you configured you middleware for HS256, but you are sending an RS256 signed token the error message will be different:

![Wrong Signature Configured](/media/articles/server-apis/aspnet-core-webapi/troubleshoot-wrong-signature-hs256.png)

In this case the relevant error message to look for is the following:

```text
Bearer was not authenticated. Failure message: IDX10501: Signature validation failed. Unable to match 'kid': 'NTF...'
```

To resolve this issue, be sure to that the signature algorithm with which the JWT was signed matches with how your middleware is configured.

## 3. Has your token expired?

Each JSON Web Token is only valid until the time specified in the `exp` claim. If you and send a token which has expired, the token will be rejected:

![Token Expired](/media/articles/server-apis/aspnet-core-webapi/troubleshoot-token-expired.png)

The error message to look for is the following:

```text
IDX10223: Lifetime validation failed. The token is expired
```

The resolve this issue, be sure to send a token which has not expired.

::: panel exp
The value of the `exp` claim is a numeric value representing the number of seconds from 1970-01-01T00:00:00Z UTC until the specified UTC date/time. If you want to see the actual date/time for the value, you can visit <a href="http://www.epochconverter.com/">EpochConverter</a>.
:::

## 4. Did you configure the correct Issuer?

The Issuer specified in your token must match exactly with what is configured in your JWT middleware.

![Issuer Validation Failed](/media/articles/server-apis/aspnet-core-webapi/troubleshoot-issuer-validation-failed.png)

The error message to look for is the following:

```text
IDX10205: Issuer validation failed.
```

The resolve this issue, ensure that you specify the correct issuer for your JWT middeware. For HS256 signed tokens, be sure to specify the correct value for the `ValidIssuer` property of the `TokenValidationParameters`.

::: panel Using RS256
For RS256 tokens the JWT middleware will download the OIDC discovery document from the `Authority` and configure the Issuer based on the `issuer` attribute specified in that document. You will therefore not get this error when using RS256 since because if your specified the wrong `Authority` then the signature validation would have failed first.
:::

## 5. Does the audience match?

The audience specified in your token must match exactly with what is configured in your JWT middleware.

![Audience Validation Failed](/media/articles/server-apis/aspnet-core-webapi/troubleshoot-audience-validation-failed.png)

The error message to look for is the following:

```text
IDX10214: Audience validation failed
```

The resolve this issue, ensure that you specify the correct audience for your JWT middeware. Depending on how your JWT middleware was configured this means that you need to set the correct `Audience` property of the `JwtBearerOptions`, or the `ValidAudience` property of the `TokenValidationParameters`.
