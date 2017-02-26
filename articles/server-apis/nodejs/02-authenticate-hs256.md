---
title: Authentication (HS256)
description: This tutorial demonstrates how to verify an HS256-signed JSON Web Token and protect endpoints in an Express API
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-express-api-samples',
  path: '01-Authenticate-HS256',
  branch: 'p1',
  requirements: [
    'NodeJS 4.3',
    'Express 4.11'
  ]
}) %>

::: panel-warning Before Starting
This tutorial demonstrates how to verify JSON Web Tokens (JWT) signed with the **HS256** algorithm. Check the signing algorithm used for your JWT by debugging it at [JWT.io](https://jwt.io) and checking the `alg` key in the `header`. If the algorithm is `HS256`, use this guide. If it is `RS256`, use the [RS256 guide](https://auth0.com/docs/quickstart/backend/nodejs/03-authenticate-rs256).
:::

## Installation

Install the **express-jwt** package.

${snippet(meta.snippets.dependencies)}

## Configuration

Configure the **express-jwt** middleware with the **ID** (as the `audience`) and **secret** for your Auth0 client.

${snippet(meta.snippets.setup)}

## Apply the Middleware

With the **express-jwt** middleware configured, add it to any endpoints you wish to protect.

${snippet(meta.snippets.use)}

## Call the API

Requests to your API's protected endpoints now require that a JWT signed with your client's secret be included in the `Authorization` header using the `Bearer` scheme.

```har
{
  "method": "GET",
  "url": "http://localhost:8000/path_to_your_api",
  "headers": [
    { "name": "Authorization", "value": "Bearer YOUR_ID_TOKEN_HERE" }
  ]
}
```
