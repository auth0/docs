---
title: Securing Google Cloud Endpoints with Auth0
description: How to secure a Google Cloud Endpoints API with Auth0.
toc: true
---

# Securing Google Cloud Endpoints with Auth0

[Google Cloud Endpoints (GCE)](https://cloud.google.com/endpoints/) is an API management system providing features to help you create, maintain, and secure your APIs. GCE uses [OpenAPI](https://www.openapis.org/) to define your API's endpoints, input and output, errors, and security description.

::: note
For more information on the OpenAPI spec, see the [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification) repository on GitHub.
:::

This tutorial will cover how to secure Google Cloud Endpoints with Auth0.

## Prerequisites

Before you begin you'll need a deployed GCE API. If you haven't already created an API, complete the [Cloud Endpoints Quickstart](https://cloud.google.com/endpoints/docs/quickstart-endpoints).

The quickstart will walk you through creating a simple GCE API with a single endpoint, `/airportName`, that returns the name of an airport from its three-letter [IATA code](https://en.wikipedia.org/wiki/IATA_airport_code).

```har
{
    "method": "GET",
    "url": "https://YOUR_GCE_PROJECT.appspot.com/airportName",
    "headers": [],
    "queryString" : [
      {
        "name": "iataCode",
        "value": "SFO"
      }
    ]
}
```

## Define the API in Auth0

Open [Dashboard > APIs](${manage_url}/#/apis) and create a new API.

![Create API](/media/articles/tutorials/gce-create-api.png)

Make note of the **API Audience** identifier (`http://google_api` in the screenshot above) to use in the following step.

## Update the API Configuration

Next, we'll update the OpenAPI configuration file for the GCE API. For the sample API created during the quickstart this file is `openapi.yaml`.

### Add Security Definitions

Open the configuration file and add a new `securityDefinitions` section. In this section, add a new definition (`auth0_jwt`) with the following fields:

Field | Description
------|------------
`authorizationUrl` | The authorization URL, should be set to `"https://${account.namespace}/authorize"`
`flow` | The flow used by the OAuth2 security scheme. Valid values are `"implicit"`, `"password"`, `"application"` or `"accessCode"`.
`type` | The type of the security scheme. Valid values are `"basic"`, `"apiKey"` or `"oauth2"`
`x-google-issuer` | The issuer of a credential, should be set to `"https://${account.namespace}/"`
`x-google-jwks_uri` | The URI of the public key set to validate the JSON Web Token signature. Set this to `"https://${account.namespace}/.well-known/jwks.json"`
`x-google-audiences` | The API's identifier, make sure this value matches what you defined on the Auth0 dashboard for the API.


```yaml
securityDefinitions:
  auth0_jwt:
    authorizationUrl: "https://${account.namespace}/authorize"
    flow: "implicit"
    type: "oauth2"
    x-google-issuer: "https://${account.namespace}/"
    x-google-jwks_uri: "https://${account.namespace}/.well-known/jwks.json"
    x-google-audiences: "{YOUR_API_IDENTIFIER}"
```

### Update the Endpoint

Now, update the endpoint by adding a `security` field with the `securityDefinition` we created in the previous step.

```yaml
paths:
  "/airportName":
    get:
      description: "Get the airport name for a given IATA code."
      operationId: "airportName"
      parameters:
        -
          name: iataCode
          in: query
          required: true
          type: string
      responses:
        200:
          description: "Success."
          schema:
            type: string
        400:
          description: "The IATA code is invalid or missing."
      security:
       - auth0_jwt: []
```

In the above example, the `security` field tells the GCE proxy that our `/airportName` path expects to be secured with the `auth0-jwt` definition.

After updating the OpenAPI configuration, it should look something like this:

```yaml
---
swagger: "2.0"
info:
  title: "Airport Codes"
  description: "Get the name of an airport from its three-letter IATA code."
  version: "1.0.0"
host: "YOUR_GCE_PROJECT.appspot.com"
schemes:
  - "https"
paths:
  "/airportName":
    get:
      description: "Get the airport name for a given IATA code."
      operationId: "airportName"
      parameters:
        -
          name: iataCode
          in: query
          required: true
          type: string
      responses:
        200:
          description: "Success."
          schema:
            type: string
        400:
          description: "The IATA code is invalid or missing."
      security:
       - auth0_jwt: []
securityDefinitions:
  auth0_jwt:
    authorizationUrl: "https://${account.namespace}/authorize"
    flow: "implicit"
    type: "oauth2"
    x-google-issuer: "https://${account.namespace}/"
    x-google-jwks_uri: "https://${account.namespace}/.well-known/jwks.json"
    x-google-audiences: "{YOUR_API_IDENTIFIER}"
```

### Redeploy the API

Next, redeploy your GCE API to apply the configuration changes. If you followed along with the [Cloud Endpoints Quickstart](https://cloud.google.com/endpoints/docs/quickstart-endpoints) you can redeploy by entering the following in Google's Cloud Shell:

```bash
cd endpoints-quickstart/scripts
./deploy_api.sh
```

## Test the API

Once you've redeployed, call the API again with no security.

```har
{
    "method": "GET",
    "url": "https://YOUR_GCE_PROJECT.appspot.com/airportName",
    "headers": [],
    "queryString" : [
      {
        "name": "iataCode",
        "value": "SFO"
      }
    ]
}
```

You'll get the following response:

```json
{
 "code": 16,
 "message": "JWT validation failed: Missing or invalid credentials",
 "details": [
  {
   "@type": "type.googleapis.com/google.rpc.DebugInfo",
   "stackEntries": [],
   "detail": "auth"
  }
 ]
}
```

Which is exactly what we want!

Now go to the **Test** page of your Google Endpoints API definition on the [Auth0 Dashboard](${manage_url}/#/apis), and copy the `access_token`:

![Copy Token](/media/articles/tutorials/gce-copy-token.png)

Perform a `GET` request to your API with an Authorization Header of `Bearer {ACCESS_TOKEN}` to obtain authorized access:

```har
{
    "method": "GET",
    "url": "https://YOUR_GCE_PROJECT.appspot.com/airportName",
    "headers": [
      { "name": "Authorization", "value": "Bearer {ACCESS_TOKEN}" }
    ],
    "queryString" : [
      {
        "name": "iataCode",
        "value": "SFO"
      }
    ]
}
```

And that's it!