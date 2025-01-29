---
description: Learn how to impersonate a user using the Impersonation API.
sitemap: false
topics:
    - users
    - user-management
    - user-profiles
contentType: how-to
useCase: manage-users
v2: true
---

# Impersonate Users Using the Impersonation API

<%= include('../../_includes/_deprecate-impersonation') %>

Use the [Impersonation API](/api/authentication/reference#impersonation) to generate a link that can be used **only once** to log in as a specific user. To distinguish between real logins and impersonation logins, the profile of the impersonated user will also contain additional `impersonated` and `impersonator` properties. 

The following steps assume that you have two apps, `app1` and `app2`, and you want to impersonate the users of `app2`. You will need to locate the `user_id` of the user you wish to impersonate, either via the Dashboard or the Management API. Next, you will need to obtain an authorization code via the impersonation endpoint. Finally, you will need to exchange your code for a valid Access Token, and your impersonation process will be complete. You can walk through the steps below which use the example `app1` and `app2`.

1. Use one of two methods to locate the `user_id` of a given user that you want to impersonate. You can either use the Management API v2 to retrieve it, or you can use the Dashboard.

   - **Option A: Use the Management API**
     First, you will need an APIv2 token, if you want to retrieve the `user_id` via the Management API. You can get one by making a `POST` request to the [Token endpoint](/api/authentication#client-credentials). For details on how to do that see [Access Tokens for the Management API](/api/management/v2/concepts/tokens).

     The Management APIv2 Token will be valid for 24 hours, so you should ask for a token every time you make a request to the API, or be prepared to handle a high volume of  `401` responses.

     After you have a token, you will have to use the token to retrieve the user id of the user that you want to impersonate (in this example, a user of `app2`). You can retrieve this information with the [Management API /api/v2/users](/api/management/v2#!/Users/get_users) endpoint.

     ```har
     {
        "method": "GET",
        "url": "https://${account.namespace}/api/v2/users",
        "headers": [
          { "name": "Authorization", "value": "Bearer YOUR_ACCESS_TOKEN" }
        ]
     }
     ```

     Replace `YOUR_ACCESS_TOKEN` with the Management APIv2 token you got in the previous step.

   - **Option B: Use the Dashboard**
     Alternatively, you can retrieve the `user_id` information from the Dashboard. Go to the [Users](${manage_url}/#/users) section and look at the user's profile. The `user_id` is displayed under the **Identity Provider Attributes** section.

2. Get an Authorization Code. Before calling the call the [Impersonation API](/api/authentication/reference#impersonation) you will need to generate a Bearer token. You can generate it with the [Management API V1 /oauth/token endpoint](/api/management/v1#authentication) with your **Global Client ID** and **Global Client Secret** which both can be found in the Dashboard under [Tenant Settings > Advanced](${manage_url}/#/tenant/advanced).

![Global Client Information](/media/articles/user-profile/global-client-info.png)

3. You can now send a request to the [impersonation endpoint](/api/authentication/reference#impersonation) by sending an `Authorization` header with `Bearer <TOKEN_FROM_MANAGEMENT_API_V1>`.

   The data part of the request includes the following parameters:

   - `protocol`: The protocol to use against the identity provider. It could be `oauth2` again or something else. (for example, Office 365 uses WS-Federation, G Suite uses OAuth2, AD will use LDAP or Kerberos).

   - `impersonator_id`: The `user_id` of the impersonator, the user from `app1` that wants to impersonate a user from `app2`.

   - `client_id`: The `client_id` of the app that is generating the impersonation link, in this example `app1`.

   - `additionalParameters`: This is a JSON object. For a regular web app, you should set the `response_type` to be `code`, the `callback_url` to be the callback url to which Auth0 will redirect with the authorization code, and the `scope` to be the JWT claims that you want included in the JWT. For example:
  
     ```json
     {
       "response_type": "code",
       "state": "",
       "callback_url" : "http://localhost:3001/register",
       "scope" : "openid email name user_metadata"
     }
     ```

   - `state`: is an optional parameter, but we strongly recommend you use it to [mitigate CSRF attacks](/protocols/oauth2/mitigate-csrf-attacks).

   - `callback_url`: Must match what is defined in your [Application's Settings](${manage_url}/#/applications/${account.clientId}/settings).

   - `scope`: There are various possible values for `scope`:

     - `scope: 'openid'`: _(default)_ Returns an opaque Access Token **and** an [ID Token](/tokens/concepts/id-tokens), which is a JSON Web Token ([JWT](/tokens/concepts/jwts)). The JWT will only contain the user ID (`sub` claim).
     - `scope: 'openid {attr1} {attr2} {attrN}'`: Returns only specific user's attributes to be part of the [ID Token](/tokens/concepts/id-tokens) (for example, `scope: 'openid name email picture'`).

     For more information, see [Scopes documentation](/scopes).

     ::: note
     Impersonation cannot be used to return [Access Tokens](/tokens/concepts/overview-access-tokens) to your APIs.
     :::

     Your request should look like the following:

     ```har
     {
       "method": "POST",
       "url": "https://${account.namespace}/users/USER_ID/impersonate",
       "headers": [
         { "name": "Content-Type", "value": "application/json" },
         { "name": "Authorization", "value": "Bearer YOUR_ACCESS_TOKEN" }
       ],
       "postData": {
         "mimeType": "application/json",
         "text": "{\"protocol\": \"PROTOCOL_TO_USE\",\"impersonator_id\": \"IMPERSONATOR_ID\",\"client_id\": \"${account.clientId}\",\"additionalParameters\":{\"response_type\": \"code\",\"state\": \"\"}}"
       }
     }
     ```

4. Replace the required values as follows:

   - `YOUR_USER_ID`: The `user_id` you retrieved at the second step (the user to impersonate)
   - `YOUR_ACCESS_TOKEN`: The token already retrieved at the first step
   - `PROTOCOL_TO_USE`: The protocol to use against the identity provider, for example `oauth2`
   - `IMPERSONATOR_ID`: The `user_id` of the impersonator

   A successful response returns a URL which can be used to authenticate as the user. The URL should look like the following:

   ```text
   https://${account.namespace}/users/IMPERSONATOR_ID/impersonate?&abc=XYZ123
   ```

5. Perform a GET request on the URL you received to get a new URL with a `code` and `state` value. The response should look like the following:

   ```text
   ${account.callback}/?code=AUTHORIZATION_CODE&state=STATE_VALUE
   ```

   - `${account.callback}` is the URL you specified as `callback_url` (and configured in your [Application's Settings](${manage_url}/#/applications/${account.clientId}/settings))
   - `state` should match the `state` value you sent with your request
   - `code` is the authorization code you need

   ::: panel Single-Page Apps
   The process described applies to regular web apps. In case yours is a single-page app (SPA) you should use `"response_type":"token"` when invoking the [Impersonation API](/api/authentication/reference#impersonation). Auth0 will redirect to your SPA _Callback URL_ with Access Token and ID Token in the `#` params. You can read more on the OAuth 2.0 Implicit flow [here](/protocols/oauth2/oauth-implicit-protocol).
   :::

6. Exchange the authorization code you received for a token. 

   ::: note
   This should already be implemented if you have a regular web app and are using the OAuth Server Side flow for authenticating normal users. If not, you should send a `POST` request to the [Token endpoint in Auth0](/api/authentication#authorization-code). You will need to send the authorization code obtained before along with your Client ID and Client Secret.
   :::

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
            "value": "authorization_code"
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
            "name": "code",
            "value": "YOUR_AUTHORIZATION_CODE"
          },
          {
            "name": "redirect_uri",
            "value": "${account.callback}"
          }
        ]
     }
   }
   ```

7. Replace the `AUTHORIZATION_CODE` with the `code` you received previously. Also, replace `${account.callback}` with your application's callback URL. 

   If the request is successful, you will get a JSON object with an Access Token. You can use this token to call the Auth0 APIs and get additional information such as the user profile.

   ```json
   HTTP/1.1 200 OK
   Content-Type: application/json
   {
     "access_token":"eyJz93a...k4laUWw",
     "id_token":"eyJ0XAi...4faeEoQ",
     "token_type":"Bearer",
     "expires_in":86400
   }
   ```

## Keep reading

* [User Profile Structure](/users/references/user-profile-structure)
* [Normalized User Profiles](/users/normalized)
* [Metadata Overview](/users/concepts/overview-user-metadata)
* [View Users](/users/guides/view-users)
