## Request Tokens

While you are waiting for the user to authorize the device, begin polling the token URL to request an Access Token. Using the extracted polling interval (`interval`) from the previous step, you will need to `POST` to the [token URL](/api/authentication#device-auth) sending along the `device_code`.

### Example POST to token URL

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/x-www-form-urlencoded" }
  ],
  "postData": {
    "text": "{\"grant_type\":\"urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Adevice_code\",\"device_code\": \"YOUR_DEVICE_CODE\", \"client_id\": \"${account.clientId}\" }"
  }
}
```

#### Parameters

| Parameter Name  | Description |
|-----------------|-------------|
| `grant_type`    | Set this to "urn:ietf:params:oauth:grant-type:device_code". This is an extension grant type (as defined by Section 4.5 of [RFC6749](https://tools.ietf.org/html/rfc6749#section-4.5)). |
| `device_code`   | The `device_code` retrieved in the previous step of this tutorial. |
| `client_id`     | Your application's Client ID. You can find this value in your [Application Settings](${manage_url}/#/Applications/${account.clientId}/settings). |

### Responses

While you wait for the user to authorize the device, you may receive a few different `HTTP 4xx` responses:

#### Authorization pending

You will see this error while waiting for the user to take action. Continue polling using the suggested interval retrieved in the previous step of this tutorial.

```json
{
  "error": "authorization_pending",
  "error_description": "..."
} 
```

#### Slow down

You are polling too fast. Slow down and use the suggested interval retrieved in the previous step of this tutorial.

```json
{
  "error": "slow_down",
  "error_description": "..."
} 
```

#### Expired Token

The user has not authorized the device quickly enough, so the `device_code` has expired. You should wait for the user to restart the device authorization flow to avoid unnecessary polling.

```json
{
  "error": "expired_token",
  "error_description": "..."
} 
```

#### Access Denied 

Finally, if the user refuses to authorize the device, you will receive:

```json
{
  "error": "access_denied",
  "error_description": "..."
}
```
