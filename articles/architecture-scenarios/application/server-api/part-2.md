---
description: Auth0 Configuration for the Server + API architecture scenario
toc: true
---

# Server + API: Auth0 Configuration

In this section we will review all the configurations we need to apply using the [Auth0 Dashboard](${manage_url}).

## Configure the API

Click on the [APIs menu option](${manage_url}/#/apis) on the left, and click the **Create API** button.

You will be required to supply the following details for your API:

- **Name**: a friendly name for the API. Does not affect any functionality.
- **Identifier**: a unique identifier for the API. We recommend using a URL but note that this doesn't have to be a publicly available URL, Auth0 will not call your API at all. This value cannot be modified afterwards.
- **Signing Algorithm**: the algorithm to sign the tokens with. The available values are `HS256` and `RS256`. When selecting RS256 the token will be signed with the tenant's private key. For more details on the signing algorithms see the [Signing Algorithms paragraph](#signing-algorithms) below.

![Create API](/media/articles/architecture-scenarios/server-api/create-api.png)

Fill in the required information and click the **Create** button.

### Signing Algorithms

When you create an API you have to select the algorithm your tokens will be signed with. The signature is used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way.

::: note
  The signature is part of a JWT. If you are not familiar with the JWT structure please refer to: [JSON Web Tokens (JWTs) in Auth0](/jwt#what-is-the-json-web-token-structure-).
:::

To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that. That algorithm, which is part of the JWT header, is the one you select for your API: `HS256` or `RS256`.

- **RS256** is an [asymmetric algorithm](https://en.wikipedia.org/wiki/Public-key_cryptography) which means that there are two keys: one public and one private (secret). Auth0 has the secret key, which is used to generate the signature, and the consumer of the JWT has the public key, which is used to validate the signature.

- **HS256** is a [symmetric algorithm](https://en.wikipedia.org/wiki/Symmetric-key_algorithm) which means that there is only one secret key, shared between the two parties. The same key is used both to generate the signature and to validate it. Special care should be taken in order for the key to remain confidential.

The most secure practice, and our recommendation, is to use **RS256**. Some of the reasons are:

- With RS256 you are sure that only the holder of the private key (Auth0) can sign tokens, while anyone can check if the token is valid using the public key.
- Under HS256, If the private key is compromised you would have to re-deploy the API with the new secret. With RS256 you can request a token that is valid for multiple audiences.
- With RS256 you can implement key rotation without having to re-deploy the API with the new secret.

For a more detailed overview of the JWT signing algorithms refer to: [JSON Web Token (JWT) Signing Algorithms Overview](https://auth0.com/blog/json-web-token-signing-algorithms-overview/).

## Configure the Scopes

Once the application has been created you will need to configure the Scopes which applications can request during authorization.

In the settings for your API, go to the *Scopes* tab. In this section you can add all four of the scopes which was discussed before, namely `batch:upload`, `read:timesheets`, `create:timesheets`, `delete:timesheets`, `approve:timesheets`.

::: note
  For the purposes of this document we will only be ever concerned with the `batch:upload` scope, as that is all that is required by the Cron job. For completeness sake we are however adding the necessary scopes which will be required by future applications as well.
:::

![Add Scopes](/media/articles/architecture-scenarios/server-api/add-scopes.png)

## Create the Application

When creating an API in the Auth0 Dashboard, a test application for the API will automatically be generated. In the Auth0 Dashboard, navigate to the [Application Section](${manage_url}/#/applications) and you will see the test application for the Timesheets API.

![Machine to Machine Application](/media/articles/architecture-scenarios/server-api/non-interactive-client.png)

Go to the settings for the application by clicking on the gear icon, and rename the application to `Timesheets import Job`.

For the cron job you will need a Machine to Machine Application. This test application which was generated when the API was created was automatically configured as a Machine to Machine Application as can be seen in the screenshot below.

![Machine to Machine Application Settings](/media/articles/architecture-scenarios/server-api/non-interactive-client-settings.png)

## Configure Application's access to the API

The final part of the Auth0 configuration is to allow the application access to the Timesheets API. Go back to the configuration of the API, and select the *Machine to Machine Application* tab.

You will see the **Timesheets Import Job** application listed, and it should have access to API as can be seen from the switch to the right of the application name which indicates a value of `Authorized`. If it does not indicate that the application is authorized, simply toggle the value of the switch from `Unauthorized` to `Authorized`.

![Authorize Application](/media/articles/architecture-scenarios/server-api/authorize-client.png)

You will also need to specify which scopes will be included in Access Tokens which are issued to the application when the application authorizes with Auth0.

Expand the settings for the application by clicking on the down arrow to the far right, and you will see the list of available scopes. The cron job will only require the `batch:upload` scope as it will simply create new timesheets based on the timesheet entries in the external system.

Once you have selected the `batch:upload` scope you can save the settings by clicking the **Update** button.

![Assign Scopes](/media/articles/architecture-scenarios/server-api/assign-scopes.png)

Now that we have designed our solution and discussed the configurations needed on Auth0 side, we can proceed with the implementation part. That's what the next paragraph is all about, so keep reading!


<%= include('./_stepnav', {
 prev: ["1. Solution Overview ", "/architecture-scenarios/application/server-api/part-1"], next: ["3. Application Implementation", "/architecture-scenarios/application/server-api/part-3"]
}) %>