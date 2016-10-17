---
description: How to execute an Authorization Code Grant flow with PKCE for a Mobile Application
---

# Executing an Authorization Code Grant Flow with PKCE
<%=include('../_preview-warning') %>

Before starting with the Authorization Code Grant flow, you need to generate and store a `code_verifier`

```java
SecureRandom sr = new SecureRandom();
byte[] code = new byte[32];
sr.nextBytes(code);
String verifier = Base64.encodeToString(code, Base64.URL_SAFE | Base64.NO_WRAP | Base64.NO_PADDING);
```

```objc
NSMutableData *data = [NSMutableData dataWithLength:32];
int result __attribute__((unused)) = SecRandomCopyBytes(kSecRandomDefault, 32, data.mutableBytes);
NSString *verifier = [[[[data base64EncodedStringWithOptions:0]
                        stringByReplacingOccurrencesOfString:@"+" withString:@"-"]
                        stringByReplacingOccurrencesOfString:@"/" withString:@"_"]
                             stringByTrimmingCharactersInSet:[NSCharacterSet characterSetWithCharactersInString:@"="]];
```

And using the `code_verifier`, generate a `code_challenge` that will be sent in the authorization request

```java
byte[] bytes = verifier.getBytes("US-ASCII");
MessageDigest md = MessageDigest.getInstance("SHA-256");
md.update(input, 0, input.length);
byte[] digest = md.digest();
String challenge = Base64.encodeToString(digest, Base64.URL_SAFE | Base64.NO_WRAP | Base64.NO_PADDING);
```

```objc
CC_SHA256_CTX ctx;
uint8_t * hashBytes[CC_SHA256_DIGEST_LENGTH * sizeof(uint8_t)];
memset(hashBytes, 0x0, CC_SHA256_DIGEST_LENGTH);
NSData *valueData = [verifier dataUsingEncoding:NSUTF8StringEncoding];

CC_SHA256_Init(&ctx);
CC_SHA256_Update(&ctx, [valueData bytes], (CC_LONG)[valueData length]);
CC_SHA256_Final(hashBytes, &ctx);

NSData *hash = [NSData dataWithBytes:hashBytes length:CC_SHA256_DIGEST_LENGTH];

NSString *challenge = [[[[hash base64EncodedStringWithOptions:0]
                          stringByReplacingOccurrencesOfString:@"+" withString:@"-"]
                          stringByReplacingOccurrencesOfString:@"/" withString:@"_"]
                               stringByTrimmingCharactersInSet:[NSCharacterSet characterSetWithCharactersInString:@"="]];
```

To begin an Authorization Code Grant flow, your Client application should first send the user to the authorization URL including the `code_challenge` and the method used to generate it:

```text
https://${account.namespace}/authorize?
    audience={API_AUDIENCE}&
    scope={SCOPE}&
    response_type=code&
    client_id={AUTH0_CLIENT_ID}&
    code_challenge={CODE_CHALLENGE}&
    code_challente_method=S256&
    redirect_uri={CALLBACK_URL}
```

Where:

* `audience`: The target API for which the Client Application is requesting access on behalf of the user.
* `scope`: The scopes which you want to request authorization for. These must be separated by a space.
* `response_type`: The response type. For this flow, the value must be `code`. This indicates to the Authorization Server that you are performing an Authorization Code flow.
* `client_id`: Your application's Client ID.
* `redirect_uri`: The URL to which the Authorization Server (Auth0) will redirect the User Agent (Browser) after authorization has been granted by the User. The Authorization Code will be available in the hash fragment of this URL (via the `code` param). This URL must be specified as a valid callback URL under the Client Settings of your application.
* `code_challenge`: Generated challenge from the `code_verifier`.
* `code_challente_method`: Method used to generate the challenge.

::: panel-warning A Note About code_challenge_method
The PKCE spec defines two methods, `S256` and `plain`, the former is used in this example and is the **only** one supported by Auth0 since the latter is discouraged.
:::

For example:

```html
<a href="https://${account.namespace}/authorize?scope=appointments%20contacts&audience=appointments:api&response_type=code&client_id=${account.clientId}&code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM&code_challenge_method=S256&redirect_uri=com.myclientapp://myclientapp.com/callback">
  Sign In
</a>
```

## Exchanging the Authorization Code for an Access Token

Now that you have an Authorization Code, you must exchange it for an Access Token that can be used to call your API. Using the Authorization Code (`code`) from the previous step, you will need to POST to the OAuth Token URL sending also the `code_verifier`:

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\":\"authorization_code\",\"client_id\": \"${account.clientId}\",\"code_verifier\": \"YOUR_GENERATED_CODE_VERIFIER\",\"code\": \"YOUR_AUTHORIZATION_CODE\",\"redirect_uri\": \"com.myclientapp://myclientapp.com/callback\", }"
  }
}
```

Where:

* `grant_type`: This must be `authorization_code`.
* `client_id`: Your application's Client ID.
* `code_verifier`: Cryptographically random key that was used to generate the `code_challenge` passed to `/authorize`.
* `code`: The Authorization Code received from the initial `authorize` call.
* `redirect_uri`: The URL must match exactly the `redirect_uri` passed to `/authorize`.

The response from `/oauth/token` contains `access_token`, `refresh_token`, `id_token`, and `token_type` values, for example:

```js
{
  "access_token": "eyJz93a...k4laUWw",
  "refresh_token": "GEbRxBN...edjnXbL",
  "id_token": "eyJ0XAi...4faeEoQ",
  "token_type": "Bearer"
}
```

Note that `refresh_token` will only be present in the response if you included the `offline_access` scope AND enabled "Allow Offline Access" for your Resource Server (API) in the Dashboard. For more information about Refresh Tokens and how to use them, see [our documentation](
 https://auth0.com/docs/tokens/refresh-token).

::: panel-danger Warning
It is important to understand that the Authorization Code flow with PKCE can only be used for Clients whose type is `Native` in the Dashboard.
:::

## Using the Access Token

Once the `access_token` has been obtained it can be used to make calls to the Resource Server by passing it as a Bearer Token in the `Authorization` header of the HTTP request:

```har
{
  "method": "GET",
  "url": "https://someapi.com/api",
  "headers": [
    { "name": "Content-Type", "value": "application/json" },
    { "name": "Authentication", "value": "Bearer {ACCESS_TOKEN}" }
  ]
}
```
