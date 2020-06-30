# Securing Apigee with Auth0

If you are using Apigee Edge for developing and managing your backend service APIs, you can use Auth0 to secure access to your API proxies.

## Prerequisites

Before you begin, you'll need to:

1. Have an [Apigee Edge API proxy](https://docs.apigee.com/api-platform/get-started/get-started) that needs to be secured.
2. [Sign up](https://auth0.com/signup) for an account with Auth0.

The process of building your API proxy is outside the scope of this article. Instead, we will focus on securing an API proxy that you already have using Auth0.

## Create a custom API

First, [register your Apigee Edge API Proxy using the Dashboard](/getting-started/set-up-api). Auth0 needs to recognize Apigee as an audience to make sure that any Access Tokens issued are issued with the correct audience. The user authenticates with Auth0 via the application, and the application specifies this audience value to make sure that the Access Token possesses the right scopes for the audience provided.

You'll need to do the following:

1. Provide a name for your API (e.g., `apigee`).
2. Provide an identifier for your API: `urn:apigee:target:api`
3. Choose a [signing algorithm](/tokens/concepts/signing-algorithms): `RS256` (default)

When you register your Apigee Edge API Proxy, Auth0 also creates a **Machine to Machine (M2M)** application on your behalf and names it to match the API you registered. You can use this application for testing; it is automatically configured to be authorized to call your API. 

## Note variables from the test application

Switch to the test application created when registering your API and make note of the variables that were set during the process of registering your API and creating the associated M2M application. You will need them for subsequent steps of this tutorial.

1. Navigate to the [Applications](${manage_url}/#/applications) page in the [Auth0 Dashboard](${manage_url}/), and click the name of your test application.

2. Scroll down and make note of the following variables:

* API audience
* Auth0 domain
* Client ID
* Allowed callback URL(s): The URLs to which the user can be redirected after authentication. You can specify multiple URLs by comma-separating them. (This is typically done to handle different environments where each needs its own redirects.)

## Implement the Client Credentials flow

Now you're ready to implement the [Client Credentials Flow](/flows/guides/client-credentials/call-api-client-credentials#request-token) to request the Access Tokens you can provide to Apigee Edge. Note that in this scenario, you will use the Client Credentials Flow because you are using Apigee with your backend service APIs, which represents a Machine-to-Machine (M2M) application; other scenarios may require the use of different flows.

To learn how to log in and get an Access Token that can be used to call Apigee Edge, see [Call API Using the Client Credentials Flow](/flows/guides/client-credentials/call-api-client-credentials).

## Validate the Access Token

Once you've requested and received an Access Token from Auth0, you'll be able to use it to call the API proxy you set up with Edge.

When you [use your Access Token](https://docs.apigee.com/api-platform/security/oauth/using-access-tokens.html), the first thing Apigee Edge will do is [verify the token](https://docs.apigee.com/api-platform/security/oauth/using-access-tokens.html#addingaverifyaccesstokenpolicy). 

Auth0 Access Tokens are [JSON Web Tokens (JWTs)](/tokens/concepts/jwts), so you can take advantage of Apigee Edge's [Verify JWT policy](https://docs.apigee.com/api-platform/reference/policies/verify-jwt-policy#verify-a-jwt-signed-with-the-rs256-algorithm) to do this.

Apigee Edge will verify the token before anything else happens; if the token is rejected, then all processing will stop and Edge will return an error to the client.

## Testing

To test your implementation, make an [HTTP POST call to Apigee Edge](https://docs.apigee.com/api-platform/security/oauth/oauth-20-client-credentials-grant-type.html#callingtheprotectedapi) with the Auth0-issued Access Token included in the header of the call.

When you receive a successful response, extract the token and review it to verify the inclusion of required/requested user claims.
