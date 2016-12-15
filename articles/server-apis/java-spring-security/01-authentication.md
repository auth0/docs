---
title: Authentication
name: Shows how to secure your API
budicon: 500
---

You can get started by either downloading the seed project or if you would like to add Auth0 to an existing application you can follow the tutorial steps.

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-spring-security-api-sample',
  path: '01-Authentication',
  requirements: [
    'Java 7 or above',
    'Maven 3.0.x or above'
  ]
}) %>

Auth0 can sign JSON Web Tokens (JWT) using either a symmetric key (HS256) or an asymmetric key (RS256).

> For more information on the signing algorithms see: [JSON Web Token (JWT) Signing Algorithms Overview](https://auth0.com/blog/json-web-token-signing-algorithms-overview/)

## 1. Configure JSON Web Token Signature Algorithm

To configure the JWT Signature Algorithm, go to the settings for your client in the Auth0 Dashboard, scroll down and click on **Show Advanced Settings**. Go to the **OAuth** tab and set the **JsonWebToken Signature Algorithm** to the algorithm you want to use: `RS256` or `HS256`.

Save your changes.

![Configure JWT Signature Algorithm as RS256](/media/articles/server-apis/aspnet-core-webapi/jwt-signature-rs256.png)

The next step is to configure your API to use the algorithm you chose. If you downloaded our seed, `HS256` is configured by default. To change this, edit the `/src/main/resources/auth0.properties` file as follows:

```properties
#auth0.signingAlgorithm: HS256
auth0.signingAlgorithm: RS256
auth0.publicKeyPath: certificate/cert.pem
```

The [library](https://github.com/auth0/auth0-spring-security-api) uses the `signingAlgorithm` property to determine which algorithm to use. The `publicKeyPath` attribute specifies the location of the certificate.

## 2. Configure the endpoints

In our example we will assume two endpoints: `ping` and `secured/ping`. The former will not require authentication, while the later will do.

First we need to create the controller for our endpoints: `PingController.java`.

${snippet(meta.snippets.PingController)}

Next we need to configure which endpoint is secure and which is not. Edit the `AppConfig.java` file.

${snippet(meta.snippets.SecurePingController)}

## 3. Using the API

To test your endpoints you need to start the API and then send the relevant HTTP requests.

In order to build and run our seed project use the command: `mvn spring-boot:run`.

To test the non-secure endpoint send a `GET` request at `http://localhost:3001/ping`.

```bash
curl -X GET -H "Content-Type: application/json" -H "Cache-Control: no-cache" "http://localhost:3001/ping"
```

You should get the message: `All good. You DO NOT need to be authenticated to call /ping`.

To test the secure endpoint send a `GET` request at `http://localhost:3001/secured/ping`. In this case you will also have to add a valid `id_token` to your request.

```bash
curl -X GET -H "Authorization: Bearer {YOUR_ID_TOKEN}" -H "Cache-Control: no-cache" "http://localhost:3001/secured/ping"
```

You should get the message: `All good. You DO need to be authenticated to call /secured/ping`.

If the token is not specified you will get the following JSON as response.

```json
{
  "timestamp":1473245148067,
  "status":403,
  "error":"Forbidden",
  "message":"Access Denied",
  "path":"/secured/ping"
}
```

A quick and easy way to obtain an `id_token` is to call the `/oauth/ro` endpoint using the Auth0 [Authentication API Explorer](/api/authentication/reference#resource-owner):

![Obtain a JWT](/media/articles/server-apis/java-spring-security/request-jwt.png)

Now you can use the `id_token` and pass it along in the Authorization header as a Bearer token.

## 4. You're done!

You have secured your Java Spring Security API endpoints using Auth0. Congrats, you're awesome!
