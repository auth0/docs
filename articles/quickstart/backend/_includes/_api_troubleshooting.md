

If you configured JWT validation correctly, you will be able to get proper responses from your API when you make requests. However, in the case where you get a 401 (Unauthorized) response from your API, it is because the configuration of your JWT middleware does not match with the JWT which was passed.

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

So in other words these values in your JWT validation configuration registration must match **exactly** - including the trailing slash for the Issuer, such as

```
audience = "https://rs256.test.api",
domain = "https://jerrie.auth0.com/"
};
```

For a token signed using HS256, the debugger view will look a little different:

![Debugging a JWT on JWT.io](/media/articles/server-apis/aspnet-core-webapi/jwt-io-debugger-hs256.png)

In the screenshot above you can see that the token was signed using the **HS256** algorithm. The **Issuer** of the token is **https://jerrie.auth0.com/**, and the **Audience** is **https://hs256.test.api**.

