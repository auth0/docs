---
title: Authentication
name: Shows how to secure your API using the standard JWT middeware
description: This document will help you troubleshoot your configuration if you get 401 (Unauthorized) response from your API.
budicon: 500
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

So in other words these values in your JWT middleware registration must match **exactly** - including the trailing slash for the Issuer, e.g.:

```csharp
var options = new JwtBearerOptions
{
    Audience = "https://rs256.test.api",
    Authority = "https://jerrie.auth0.com/"
};
app.UseJwtBearerAuthentication(options);
```

For a token signed using HS256, the deugger view will look a little different:

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

> Authorization failed for the request at filter 'Microsoft.AspNetCore.Mvc.Authorization.AuthorizeFilter'.

To resolve this issue, ensure that your send the JWT as a bearer token 

## 2. Did you configure the JWT middleware for the correct signing algorithm?

Another common mistake is that your tokens are signed using the HS256 signing algorithm, but your middleware is configured for RS256 - or vice versa.

In the following screenshot you can see that I still get the "Authorization failed..." warning message, but you will also notice that there is an informational message above that with more information:

![Wrong Signature Configured](/media/articles/server-apis/aspnet-core-webapi/troubleshoot-wrong-signature-rs256.png)

The relevant error message to look for is the following:

> System.ArgumentException: IDX10634: Unable to create the SignatureProvider.
>
> SignatureAlgorithm: 'HS256', SecurityKey: 'Microsoft.IdentityModel.Tokens.RsaSecurityKey' is not supported.

So the error tells me that the JWT is signed using HS256, but this algorithm is not configured, because my middleware was configured to expect RS256 tokens.

In the case where you configured you middleware for HS256, but you are sending an RS256 signed token the error message will be different:

![Wrong Signature Configured](/media/articles/server-apis/aspnet-core-webapi/troubleshoot-wrong-signature-hs256.png)

In this case the relevant error message to look for is the following:

> Bearer was not authenticated. Failure message: IDX10501: Signature validation failed. Unable to match 'kid': 'NTF...'

