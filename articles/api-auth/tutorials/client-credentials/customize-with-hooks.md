---
description: How to use Hooks to change the scopes and add custom claims to the tokens you got using Client Credentials Grant.
crews: crew-2
toc: true
beta: true
topics:
  - api-authentication
  - oidc
  - client-credentials
  - hooks
contentType: tutorial
useCase:
  - secure-api
  - call-api
  - extensibility-hooks
---

# Use Hooks with Client Credentials Grant

You can now add [Hooks](/hooks) into your [client credentials](/api-auth/grant/client-credentials) flow. This way you can change the <dfn data-key="scope">scopes</dfn> and add custom claims to the tokens issued by Auth0.

Hooks allow you to customize the behavior of Auth0 using Node.js code. They are secure, self-contained functions associated with specific extensibility points of the Auth0 platform (like the Client Credentials grant). Auth0 invokes the Hooks at runtime to execute your custom logic.

You can manage Hooks using the Auth0 Dashboard or the Management API. 

## Before you start

Create the following:

- [API defined with the appropriate scopes](${manage_url}/#/apis)
- [Machine-to-machine application](/applications) authorized to use the API

For details on how to set up the API and the machine-to-machine app, see:
- Set up a Client Grant:
  - [Using the Dashboard](/api-auth/config/using-the-auth0-dashboard)
  - [Using the Management API](/api-auth/config/using-the-management-api)
- [Execute a Client Credentials Grant](/api-auth/config/asking-for-access-tokens)

## Use the Dashboard

1. Go to [the Hooks page of the Dashboard](${manage_url}/#/hooks).

  ![Dashboard Hooks](/media/articles/api-auth/hooks/dashboard-hooks.png)

2. Click the __+ Create New Hook__ button. On the _New Hook_ pop-up window, set the __Hook__ dropdown to `Client Credentials Exchange` and set a __Name__ for your hook. Click __Create__.

  ![New Client Credentials Hook](/media/articles/api-auth/hooks/new-cc-hook.png)

  At this point, you will see your newly-created Hook listed under the _Client Credentials Exchange_.

::: note
You can create more than one hooks per extensibility point but __only one__ can be enabled. The enabled hook will then be executed for __all__ applications and APIs.
:::

3. Click the __Pencil and Paper__ icon to the right of the Hook to open the Hook Editor.

  ![Edit Client Credentials Hook](/media/articles/api-auth/hooks/edit-cc-hook.png)

4. Using the Hook Editor, write your Node.js code. As an example, we will add an extra scope. The claim's name will be `https://foo.com/claim` and its value `bar`. Copy the sample code below and paste it in the Editor.

  ```js
  module.exports = function(client, scope, audience, context, cb) {
    var access_token = {};
    access_token['https://foo.com/claim'] = 'bar';
    access_token.scope = scope;
    access_token.scope.push('extra');
    cb(null, access_token);
  };
  ```

  This sample hook will:
  - add an arbitrary claim (`https://foo.com/claim`) to the Access Token
  - add an `extra` scope to the default scopes configured on your [API](${manage_url}/#/apis).

  ::: panel Custom claims namespaced format
  In order to improve compatibility for applications, Auth0 now returns profile information in a [structured claim format as defined by the OpenID Connect (OIDC) specification](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims). This means that in order to add custom claims to ID Tokens or <dfn data-key="access-token">Access Tokens</dfn>, they must [conform to a namespaced format](/tokens/guides/create-namespaced-custom-claims) to avoid possible collisions with standard OIDC claims.
  :::

  ![Hook Editor](/media/articles/api-auth/hooks/cc-webtask-editor.png)

  Click __Save__ (or hit Ctrl+S/Cmd+S) and close the Editor.

5. That's it! Now you only need to test your hook. You can find detailed instructions at the [Test your Hook](#test-your-hook) paragraph.

## Test your Hook

To test the hook you just created you need to run a Client Credentials exchange, get the Access Token, decode it and review its contents.

To get a token, make a `POST` request at the `https://${account.namespace}/oauth/token` API endpoint, with a payload in the following format.

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/x-www-form-urlencoded" }
  ],
  "postData": {
    "mimeType": "application/x-www-form-urlencoded",
    "params": [
      {
        "name": "grant_type",
        "value": "client_credentials"
      },
      {
        "name": "client_id",
        "value": "${account.clientId}"
      },
      {
        "name": "client_secret",
        "value": "YOUR_CLIENT_SECRET"
      },
      {
        "name": "audience",
        "value": "YOUR_API_IDENTIFIER"
      }
    ]
  }
}
```

::: note
If you don't know where to find the Client Id, Client Secret, or API Identifier information, refer to <a href="/api-auth/config/asking-for-access-tokens#where-to-find-the-ids">Where to Find the IDs</a>.
:::

A successful response will include:
- an `access_token`,
- its expiration time in seconds (`expires_in`),
- the token's type set as `Bearer` (`token_type`), and
- an `extra` scope (`scope`) (this scope was added by your hook)

```text
HTTP/1.1 200 OK
Content-Type: application/json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5ESTFNa05DTVRGQlJrVTRORVF6UXpFMk1qZEVNVVEzT1VORk5ESTVSVU5GUXpnM1FrRTFNdyJ9.eyJpc3MiOiJodHRwczovL2RlbW8tYWNjb3VudC5hdXRoMC3jb20vIiwic3ViIjoic0FRSlFpQmYxREw0c2lqSVZCb2pFRUZvcmRoa0o4WUNAY2xpZW50cyIsImF1ZCI6ImRlbW8tYWNjb3VudC5hcGkiLCJleHAiOjE0ODc3NjU8NjYsImlhdCI6MTQ4NzY3OTI2Niwic2NvcGUiOiJyZWFkOmRhdGEgZXh0cmEiLCJodHRwczovL2Zvby5jb20vY2xhaW0iOiKoPXIifQ.da-48mHY_7esfLZpvHWWL8sIH1j_2mUYAB49c-B472lCdsNFvpaLoq6OKQyhnqk9_aW_Xhfkusos3FECTrLFvf-qwQK70QtwbkbVye_IuPSTAYdQ2T-XTzGDm9Nmmy5Iwl9rNYLxVs2OoCdfpVMyda0OaI0AfHBgEdKWluTP67OOnV_dF3KpuwtK3dPKWTCo2j9VCa7X1I4h0CNuM79DHhY2wO7sL8WBej7BSNA3N2TUsp_YTWWfrvsr_vVhJf-32G7w_12ms_PNFUwj2C30ZZIPWc-uEkDztyMLdI-lu9q9TLrLdr0dOhfrtfkdeJx4pUSiHdJHf42kg7UAVK6JcA",
  "expires_in": 86400,
  "scope": "extra",
  "token_type": "Bearer"
}
```

Copy the Access Token.

The easiest way to decode it and review its contents is to use the [JWT.io Debugger](https://jwt.io/#debugger-io).

Paste your Access Token at the left-hand editor. Automatically the JWT is decoded and its contents are displayed on the right-hand editor.

![Decode Token with JWT.io](/media/articles/api-auth/hooks/cc-decode-token.png)

Look into the last two items of the __Payload__. Both have been set by our hook:
- `"scope": "extra"`
- `"https://foo.com/claim": "bar"`

## Manage your Hooks

You can disable, enable, delete or edit hooks using either the Auth0 CLI or the [dashboard](${manage_url}/#/hooks). You can also review your logs using the Auth0 CLI. For details, refer to the articles below.

Use the Dashboard to:
- [Delete Hooks](/auth0-hooks/dashboard/create-delete)
- [Edit Hooks](/auth0-hooks/dashboard/edit)
- [Enable or disable Hooks](/auth0-hooks/dashboard/enable-disable)

Use the Auth0 CLI to:
- [Delete Hooks](/auth0-hooks/cli/create-delete)
- [Edit Hooks](/auth0-hooks/cli/edit)
- [Enable or disable Hooks](/auth0-hooks/cli/enable-disable)
- [Review Logs](/auth0-hooks/cli/logs)

## Input Parameters

The hook takes five input parameters. You can use these values for your custom logic.

Let's see what each one contains.

- __client__ (object): Information on the application asking for the token, including the `client` metadata (a key-value pair that can be set by application). Sample snippet:

    ```json
    {
      "tenant":  "tenant_name",
      "id": "tenant_id",
      "name": "test_client",
      "metadata": {
        "some_metadata": "value"
      }
    }
    ```

- __scope__ (`string array`): The scopes available on the API that you have defined.

- __audience__ (`string`): The API identifier available via the API settings page.

- __context__ (`object`): The contextual information about the request. Sample snippet:

    ```json
    {
      "ip": "123.123.123.123",
      "userAgent": "...",
      "webtask": {
        "secrets": { "FOO": "bar" }
      }
    }
    ```

- __cb__: The <dfn data-key="callback">callback</dfn>. In our example we returned the token (`cb(null, access_token)`). If you decide, however, not to issue a token, you can return `Error (cb(new Error('access denied')))`.

## Keep reading

* [What are Hooks and how you can work with them](/hooks)
* [Overview of the Client Credentials Grant](/api-auth/grant/client-credentials)
* [How to set up a Client Grant using the Dashboard](/api-auth/config/using-the-auth0-dashboard)
* [How to set up a Client Grant using the Management API](/api-auth/config/using-the-management-api)
* [How to execute a Client Credentials Grant](/api-auth/config/asking-for-access-tokens)
