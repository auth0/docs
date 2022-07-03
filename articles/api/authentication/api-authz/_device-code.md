# Get Device Code

To begin the [Device Authorization Flow](/flows/concepts/device-auth), your application should first request a device code. 

## Device Authorization Flow

```http
POST https://${account.namespace}/oauth/device/code
Content-Type: application/x-www-form-urlencoded

client_id=${account.clientId}&scope=SCOPE&audience=API_IDENTIFIER
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/device/code' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'client_id=${account.clientId}&scope=SCOPE&audience=API_IDENTIFIER'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/oauth/device/code',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  form:
   { client_id: '${account.clientId}',
     scope: 'SCOPE',
     audience: 'API_IDENTIFIER' }
   };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

> RESPONSE SAMPLE

```JSON
HTTP/1.1 200 OK
Content-Type: application/json
{
  "device_code":"GmRh...k9eS",
  "user_code":"WDJB-MJHT",
  "verification_uri":"https://${account.namespace}/device",
  "verification_uri_complete":"https://${account.namespace}/device?user_code=WDJB-MJHT",
  "expires_in":900, //in seconds
  "interval":5
}
```

<%= include('../../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "POST",
  "path": "/oauth/device/code",
  "link": "#device-code"
}) %>

This is the flow that input-constrained devices use to access an API. Use this endpoint to get a device code.

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `audience` <br/> | The unique identifier of the target API you want to access. |
| `scope` | The scopes for which you want to request authorization. These must be separated by a space. You can request any of the [standard OIDC scopes](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) about users, such as `profile` and `email`, custom claims that must [conform to a namespaced format](/tokens/guides/create-namespaced-custom-claims), or any scopes supported by the target API (for example, `read:contacts`). Include `offline_access` to get a Refresh Token. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's ID. |

### Response Values

| Value                        | Description |
|:-----------------------------|:------------|
| `device_code` | The unique code for the device. When the user visits the `verification_uri` in their browser-based device, this code will be bound to their session. |
| `user_code` | The code that the user should input at the `verification_uri` to authorize the device. |
| `verification_uri` | The URL the user should visit to authorize the device. |
| `verification_uri_complete` | The complete URL the user should visit to authorize the device. Your app can use this value to embed the `user_code` in the URL, if you so choose. |
| `expires_in` | The lifetime (in seconds) of the `device_code` and `user_code`. |
| `interval` | The interval (in seconds) at which the app should poll the token URL to request a token. |

### Remarks

- Include `offline_access` to the `scope` request parameter to get a Refresh Token from [POST /oauth/token](#device-auth). Make sure that the **Allow Offline Access** field is enabled in the [API Settings](${manage_url}/#/apis).

### More Information

- [Device Authorization Flow](/flows/concepts/device-auth)
- [Call API Using the Device Authorization Flow](/flows/guides/device-auth/call-api-device-auth)
