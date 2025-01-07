<!-- markdownlint-disable MD024 MD033 -->
# Back-Channel Login

:::note
This feature is currently in Early Access. To request access, contact your Technical Account Manager.
:::

The Back-Channel Login endpoint enables applications to send an authentication request to a user’s phone, or the authentication device, provided they have an app installed and are enrolled for [push notifications using the Guardian SDK](/secure/multi-factor-authentication/auth0-guardian#enroll-in-push-notifications).

Use the Back-Channel Login endpoint to authenticate users for the following use cases:

- Users are not in front of the application that requires authentication, such as when they're telephoning a call center.
- The consumption device, or the device that helps the user consume a service, is insecure for sensitive operations e.g. web browser for financial transactions.
- The consumption device has limited interactive capability e.g. e-bicycles or e-scooters.

## Authorize
<%= include('../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "POST",
  "path": "/bc-authorize",
  "link": "#authorize"
}) %>

```http
curl --location 'https://[TENANT_DOMAIN]/bc-authorize' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'client_id=[CLIENT ID]' \
--data-urlencode 'client_secret=[CLIENT SECRET]' \
--data-urlencode 'binding_message=[YOUR BINDING MESSAGE]' \
--data-urlencode 'login_hint={ "format": "iss_sub", "iss":
"https://[TENANT].auth0.com/", "sub": "auth0|[USER ID]" }' \
--data-urlencode 'scope=openid'
```

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_id` <br/><span class="label label-danger">Required</span> | Client ID of your application. |
| `binding_message` <br/><span class="label label-danger">Required</span> | Human-readable string displayed on both the device calling `/bc-authorize` and the user’s authentication device (e.g. phone) to ensure the user is approves the correct request. For example: `ABC-123-XYZ`. |
| `login_hint` <br/><span class="label label-danger">Required</span> | String containing information about the user to contact for authentication. It uses the [IETF9493 standard for Subject Identifiers for Security Event Tokens](https://datatracker.ietf.org/doc/html/rfc9493). Auth0 only supports the [Issuer and Identifier format](https://datatracker.ietf.org/doc/html/rfc9493#name-issuer-and-subject-identifi). For an example login hint, review the [Remarks](#remarks). |
| `scope` <br/><span class="label label-danger">Required</span> | Space-separated list of OIDC and custom API scopes. For example: `openid read:timesheets edit:timesheets`. Include `offline_access` to get a refresh token. At a minimum, you must include the scope `openid`. |
| `audience` <br/><span class="label label-danger">Optional</span> | Unique identifier of the audience for an issued token. If you require an access token for an API, pass the unique identifier of the target API you want to access. |
| `request_expiry` <br/><span class="label label-danger">Optional</span> | To configure a custom expiry time in seconds for this request, pass a number between 1 and 300. If not provided, expiry defaults to 300 seconds. |

### Response Body

If the request is successful, you should receive a response like the following:

```http
{
  "auth_req_id": "eyJh...",
  "expires_in": 300,
  "interval": 5
}
```

The `auth_req_id` value should be kept as it is used later in the flow to identify the authentication request.

The `expires_in` value tells you how many seconds you have until the authentication request expires. 

The `interval` value tells you how many seconds you must wait between poll requests.

The request should be approved or rejected on the user’s authentication device using the Guardian SDK.

### Remarks

The following code sample is an example login hint: 

  ```http
  { 
    "format": "iss_sub", 
    "iss": "https://[TENANT_DOMAIN]/", 
    "sub": "auth0|[USER ID]" 
  }
  ```

White space is not significant. Replace the `[TENANT_DOMAIN]` with your tenant domain or custom domain. Replace the `[USER ID]` with a valid `user_id` for the authorizing user returned from the [User Search APIs](https://auth0.com/docs/manage-users/user-search).

Include an optional parameter for application authentication in the request:

- Client Secret with HTTP Basic auth, in which case no parameters are required. The `client_id` and `client_secret` are passed in a header.
- Client Secret Post, in which case the `client_id` and `client_secret` are required.
- Private Key JWT, where the `client_id`, `client_assertion` and `client_assertion` type are required.
- mTLS, where the `client_id` parameter is required and the `client-certificate` and `client-certificate-ca-verified` headers are required.

## Get Token
<%= include('../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "POST",
  "path": "/oauth/token",
  "link": "#get-token"
}) %>

```http
curl --location 'https://[TENANT_DOMAIN]/oauth/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'client_id=[CLIENT ID]' \
--data-urlencode 'client_secret=[CLIENT SECRET]' \
--data-urlencode 'auth_req_id=[FROM THE BC-AUTHORIZE RESPONSE]' \
--data-urlencode 'grant_type=urn:openid:params:grant-type:ciba'
```

To check on the status of a Back-Channel Login flow, poll the `/oauth/token` endpoint at regular intervals by passing the following:

- `auth_req_id` returned from the call to `/bc-authorize`
- `urn:openid:params:grant-type:ciba` grant type 

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_id` <br/><span class="label label-danger">Required</span> | Client ID of your application |
| `auth_req_id` <br/><span class="label label-danger">Required</span> | Used to reference the authentication request. Returned from the call to `/bc-authorize` | 
| `grant_type` <br/><span class="label label-danger">Required</span> | Must be set to `urn:openid:params:grant-type:ciba` | 

### Response Body

If the authorizing user has not yet approved or rejected the request, you should receive a response like the following: 

```http
{ 
  "error": "authorization_pending", 
  "error_description": "The end-user authorization is pending"
}
```

If the authorizing user rejects the request, you should receive a response like the following:

```http
{
  "error": "access_denied",
  "error_description": "The end-user denied the authorization request or it
has been expired"
}
```

If you are polling too quickly (faster than the interval value returned from `/bc-authorize`), you should receive a response like the following:

```http
{
  "error": "slow_down",
  "error_description": "You are polling faster than allowed. Try again in 10 seconds."
}
```

In addition, Auth0 will add the the [Retry-After](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After) header to the response indicating how many seconds to wait before attempting to poll again. If you consistently poll too frequently, the number of seconds you must wait increases.

If the authorizing user has approved the push notification, the call returns the ID token and access token (and potentially a refresh token):

```http
{
  "access_token": "eyJh...",
  "id_token": "eyJh...",
  "expires_in": 86400,
  "scope": "openid"
}
```

Once you have exchanged an `auth_req_id` for an ID or access token, it is no longer usable.

### Remarks

Include an optional parameter for application authentication in the request:

- Client Secret with HTTP Basic auth, in which case no parameters are required. The `client_id` and `client_secret` are passed in a header.
- Client Secret Post, in which case the `client_id` and `client_secret` are required.
- Private Key JWT, where the `client_id`, `client_assertion` and `client_assertion` type are required.
- mTLS, where the `client_id` parameter is required and the `client-certificate` and `client-certificate-ca-verified` headers are required.