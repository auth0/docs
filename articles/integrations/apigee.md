# Securing Apigee with Auth0

If you are using Apigee Edge for developing and managing your backend service APIs, you can use Auth0 to secure access to your API proxies.

## Prerequisites

Before you begin, you'll need to:

1. Have an [Apigee Edge API proxy](https://docs.apigee.com/api-platform/get-started/get-started) to be secured.
2. [Sign up](https://auth0.com/signup) for an account with Auth0.

The process of building your API proxy is outside the scope of this article. Instead, we will focus on securing an API proxy that you already have using Auth0.

## Create a custom API

In the Dashboard, go to APIs and click **Create**. You will be asked to:

1. Provide a name for your API (e.g., `apigee`).
2. Identifier: `urn:apigee:target:api`
3. [Signing algorithm](/tokens/concepts/signing-algorithms): `RS256` (default)

Auth0 needs to recognize Apigee as an audience to make sure that any Access Tokens issued are issued with the correct audience. The user authenticates with Auth0 via the application, and the application specifies this audience value to make sure that the Access Token possesses the right scopes for the audience provided.

When you create a custom API, Auth0 also creates a **Machine to Machine (M2M)** application that you can use for testing on your behalf. It is automatically set to be authorized to call your API. You can access this application by switching to the **Machine to Machine Applications**. Auth0 automatically names this application to match your custom API.

Click on the application to be taken to its **Settings** page. Scroll down to **Allowed Callback URLs**. These are the URLs to which the user can be redirected after authentication. You can specify multiple URLs by comma-separating them (this is typically done to handle different environments where each needs its own redirects).

::: Auth0 Variables
Make a note of the following variables that were set during the process of creating a custom API and the associated M2M application (they will be used in subsequent steps of this tutorial):

* API audience
* Auth0 domain
* Client ID
* Allowed callback URL(s)
:::

## Implement the Client Credentials flow

Once you have your custom API registered and have configured the associated **Machine to Machine (M2M)**, you're ready to implement the [Client Credentials Flow](/flows/guides/client-credentials/call-api-client-credentials#request-token) to request the Access Tokens you can provide to Apigee Edge

At this point: log in and get an Access Token that can be used to call Apigee Edge.

[Call API Using the Client Credentials Flow](/flows/guides/client-credentials/call-api-client-credentials)

## Validate the Access Token

Once you've requested and received an Access Token from Auth0, you'll be able to use it to call the API proxy you set up with Edge.

When you [use your Access Token](https://docs.apigee.com/api-platform/security/oauth/using-access-tokens.html), the first thing Apigee Edge will do is [verify the token](https://docs.apigee.com/api-platform/security/oauth/using-access-tokens.html#addingaverifyaccesstokenpolicy). 

Auth0 Access Tokens are [JSON Web Tokens (JWT)](/jwt), so you can take advantage of Apigee Edge's [Verify JWT policy](https://docs.apigee.com/api-platform/reference/policies/verify-jwt-policy#verify-a-jwt-signed-with-the-rs256-algorithm) to do this.

Apigee Edge will verify the token before anything else happens; if the token is rejected, then all processing stops and Edge returns an error to the client.

## Testing

At this point, you're ready to test your implementation. To do so, make an [HTTP POST call to Apigee Edge](https://docs.apigee.com/api-platform/security/oauth/oauth-20-client-credentials-grant-type.html#callingtheprotectedapi) with the Auth0-issued access token included in the header of the call.

When you receive a successful response, extract, and review headers to verify the inclusion of required/requested user claims.