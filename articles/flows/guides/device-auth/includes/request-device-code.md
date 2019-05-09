## Request Device Code

Once the user has started their device app and wants to authorize the device, you'll need to get a device code. When the user begins their session in their browser-based device, this code will be bound to that session. 

To get the device code, your app must request a code from the [device code URL](/api/authentication#device-code), including the Client ID.

### Example POST to device code URL

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/device/code",
  "headers": [
    { "name": "Content-Type", "value": "application/x-www-form-urlencoded" }
  ],
  "postData": { 
    "text" : "{\"client_id\":\"${account.clientId}\",\"scope\":\"SCOPE\",\"audience\":\"AUDIENCE\" }"
  }
}
```

#### Parameters

Note that when requesting a device code to call a custom API, you:

- must include an audience parameter
- can include additional scopes supported by the target API

::: note
 If your app wants an Access Token only to retrieve info about the authenticated user, then no audience parameter is required.
:::

| Parameter Name  | Description |
|-----------------|-------------|
| `client_id`     |Your application's Client ID. You can find this value in your [Application Settings](${manage_url}/#/Applications/${account.clientId}/settings). |
| `scope`         | The [scopes](/scopes) for which you want to request authorization. These must be separated by a space. You can request any of the [standard OIDC scopes](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) about users, such as `profile` and `email`, [custom claims](/scopes/current/custom-claims) conforming to a [namespaced format](/api-auth/tutorials/adoption/scope-custom-claims#custom-claims), or any s[scopes supported by the target API](/scopes/current/api-scopes) (e.g., `read:contacts`). Include `offline_access` to get a Refresh Token (make sure that the __Allow Offline Access__ field is enabled in the [Application Settings](${manage_url}/#/apis)). |
|`audience`      | The unique identifier of the API your app wants to access. Use the **Identifier** value on the [Settings](${manage_url}/#/apis) tab for the API you created as part of the prerequisites for this tutorial. |

### Response

If all goes well, you'll receive an HTTP 200 response with a payload containing `device_code`, `user_code`, `verification_uri`, and `expires_in`, `interval`, and `verification_uri_complete` values:

```json
{
  "device_code": "Ag_EE...ko1p",
  "user_code": "QTZL-MCBW",
  "verification_uri": "https://accounts.acmetest.org/activate",
  "verification_uri_complete": "https://accounts.acmetest.org/activate?user_code=QTZL-MCBW",
  "expires_in": 900,
  "interval": 5
}
```

* `device_code` is the unique code for the device. When the user goes to the `verification_uri` in their browser-based device, this code will be bound to their session.
* `user_code` contains the code that should be input at the `verification_uri` to authorize the device.
* `verification_uri` contains the URL the user should visit to authorize the device.
* `verification_uri_complete` contains the complete URL the user should visit to authorize the device. This allows your app to embed the `user_code` in the URL, if you so choose.
* `expires_in` indicates the lifetime (in seconds) of the `device_code` and `user_code`.
* `interval` indicates the interval (in seconds) at which the app should poll the token URL to request a token.

::: note
To prevent brute force attacks, we enforce the following limits on `user_code`:

**Minimum length**:
* BASE20 Letters: 8 characters
* Numbers: 9 characters

**Maximum length**: 
* 20 characters (including hyphens and spaces, which may be added as separators for readability)

**Expiration time**:
* 10 minutes
:::