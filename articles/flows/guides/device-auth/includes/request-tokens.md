## Request Tokens

While you are waiting for the user to activate the device, begin polling the token URL to request an Access Token. Using the extracted polling interval (`interval`) from the previous step, you will need to `POST` to the [token URL](/api/authentication#device-auth) sending along the `device_code`.

To avoid errors due to network latency, you should start counting each interval after receipt of the last polling request's response. 

### Example request token POST to token URL

```har
{
    "method": "POST",
    "url": "https://${account.namespace}/oauth/token",
    "headers": [
      { "name": "Content-Type", "value": "application/x-www-form-urlencoded" }
    ],
    "postData" : {
      "mimeType": "application/x-www-form-urlencoded",
      "params": [
        {
          "name": "grant_type",
          "value": "urn:ietf:params:oauth:grant-type:device_code"
        },
        {
          "name": "device_code",
          "value": "YOUR_DEVICE_CODE"
        },
        {
          "name": "client_id",
          "value": "${account.clientId}"
        }
      ]
    }
}
```

#### Token Request Parameters

| Parameter Name  | Description |
|-----------------|-------------|
| `grant_type`    | Set this to "urn:ietf:params:oauth:grant-type:device_code". This is an extension grant type (as defined by Section 4.5 of [RFC6749](https://tools.ietf.org/html/rfc6749#section-4.5)). Note that this must be URL encoded. |
| `device_code`   | The `device_code` retrieved in the previous step of this tutorial. |
| `client_id`     | Your application's Client ID. You can find this value in your [Application Settings](${manage_url}/#/Applications/${account.clientId}/settings). |

### Token Responses

While you wait for the user to authorize the device, you may receive a few different `HTTP 4xx` responses:

#### Authorization pending

You will see this error while waiting for the user to take action. Continue polling using the suggested interval retrieved in the previous step of this tutorial.

```json
`HTTP 403`

{
  "error": "authorization_pending",
  "error_description": "..."
} 
```

#### Slow down

You are polling too fast. Slow down and use the suggested interval retrieved in the previous step of this tutorial. To avoid receiving this error due to network latency, you should start counting each interval after receipt of the last polling request's response. 

```json
`HTTP 429`

{
  "error": "slow_down",
  "error_description": "..."
} 
```

#### Expired Token

The user has not authorized the device quickly enough, so the `device_code` has expired. Your application should notify the user that the flow has expired and prompt them to reinitiate the flow.

::: note
Then `expired_token` error will be returned exactly once; after that, the dreaded `invalid_grant` will be returned. Your device *must* stop polling.
:::

```json
`HTTP 403`

{ 
  "error": "expired_token",
  "error_description": "..."
} 
```

#### Access Denied 

Finally, if access is denied, you will receive: 

```json
`HTTP 403`

{
  "error": "access_denied",
  "error_description": "..."
}
```
This can occur for a variety of reasons, including:

* the user refused to authorize the device
* the authorization server denied the transaction
* a configured [Rule](/rules) denied access
