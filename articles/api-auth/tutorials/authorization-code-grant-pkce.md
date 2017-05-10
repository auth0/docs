---
description: How to execute an Authorization Code Grant flow with PKCE for a Mobile Application
---

<%= include('../../_includes/_pipeline2') %>

# Execute an Authorization Code Grant Flow with PKCE

<div class="alert alert-info">
  This tutorial will help you implement the Authorization Code (PKCE) grant. If you are looking for some theory on the flow refer to <a href="/api-auth/grant/authorization-code-pkce">Calling APIs from Mobile Apps</a>.
</div>

The __Authorization Code with PKCE__ is the OAuth 2.0 grant that [native apps](/quickstart/native) use in order to access an API. In this document we will work through the steps needed in order to implement this: create a code verifier and a code challenge, get the user's authorization, get a token and access the API using the token.

## 1. Create a Code Verifier

First, you need to generate and store a `code_verifier`.

<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li class="active"><a href="#verifier-javascript" data-toggle="tab">Node.js</a></li>
      <li><a href="#verifier-java" data-toggle="tab">Java</a></li>
      <li><a href="#verifier-swift" data-toggle="tab">Swift 3</a></li>
      <li><a href="#verifier-objc" data-toggle="tab">Objective-C</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="verifier-javascript" class="tab-pane active">
      <pre>
<code class="javascript hljs">function base64URLEncode(str) {
    return str.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

var verifier = base64URLEncode(crypto.randomBytes(32));</code></pre>
    </div>
    <div id="verifier-java" class="tab-pane">
      <pre>
<code class="java hljs">SecureRandom sr = new SecureRandom();
byte[] code = new byte[32];
sr.nextBytes(code);
String verifier = Base64.encodeToString(code, Base64.URL_SAFE | Base64.NO_WRAP | Base64.NO_PADDING);</code></pre>
    </div>
    <div id="verifier-swift" class="tab-pane">
      <pre>
<code class="swift hljs">var buffer = [UInt8](repeating: 0, count: 32)
_ = SecRandomCopyBytes(kSecRandomDefault, buffer.count, &buffer)
let verifier = Data(bytes: buffer).base64EncodedString()
    .replacingOccurrences(of: "+", with: "-")
    .replacingOccurrences(of: "/", with: "_")
    .trimmingCharacters(in: .whitespaces)</code></pre>
    </div>
    <div id="verifier-objc" class="tab-pane">
      <pre>
<code class="objc hljs">NSMutableData *data = [NSMutableData dataWithLength:32];
int result __attribute__((unused)) = SecRandomCopyBytes(kSecRandomDefault, 32, data.mutableBytes);
NSString *verifier = [[[[data base64EncodedStringWithOptions:0]
                        stringByReplacingOccurrencesOfString:@"+" withString:@"-"]
                        stringByReplacingOccurrencesOfString:@"/" withString:@"_"]
                             stringByTrimmingCharactersInSet:[NSCharacterSet characterSetWithCharactersInString:@"="]];</code></pre>
    </div>
  </div>
</div>

## 2. Create a Code Challenge

Using the `code_verifier`, generate a `code_challenge` that will be sent in the authorization request.

<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li class="active"><a href="#challenge-javascript" data-toggle="tab">Node.js</a></li>
      <li><a href="#challenge-java" data-toggle="tab">Java</a></li>
      <li><a href="#challenge-swift" data-toggle="tab">Swift 3</a></li>
      <li><a href="#challenge-objc" data-toggle="tab">Objective-C</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="challenge-javascript" class="tab-pane active">
      <pre>
<code class="javascript hljs">function sha256(buffer) {
    return crypto.createHash('sha256').update(buffer).digest();
}

var challenge = base64URLEncode(sha256(verifier));</code></pre>
    </div>
    <div id="challenge-java" class="tab-pane">
      <pre>
<code class="java hljs">byte[] bytes = verifier.getBytes("US-ASCII");
MessageDigest md = MessageDigest.getInstance("SHA-256");
md.update(bytes, 0, bytes.length);
byte[] digest = md.digest();
String challenge = Base64.encodeToString(digest, Base64.URL_SAFE | Base64.NO_WRAP | Base64.NO_PADDING);</code></pre>
    </div>
    <div id="challenge-swift" class="tab-pane">
      <pre>
<code class="swift hljs"> // You need to import CommonCrypto
guard let data = verifier.data(using: .utf8) else { return nil }
var buffer = [UInt8](repeating: 0,  count: Int(CC_SHA256_DIGEST_LENGTH))
data.withUnsafeBytes {
    _ = CC_SHA256($0, CC_LONG(data.count), &buffer)
}
let hash = Data(bytes: buffer)
let challenge = hash.base64EncodedString()
    .replacingOccurrences(of: "+", with: "-")
    .replacingOccurrences(of: "/", with: "_")
    .trimmingCharacters(in: .whitespaces)</code></pre>
    </div>
    <div id="challenge-objc" class="tab-pane">
      <pre>
<code class="objc hljs"> // You need to import CommonCrypto
u_int8_t buffer[CC_SHA256_DIGEST_LENGTH * sizeof(u_int8_t)];
memset(buffer, 0x0, CC_SHA256_DIGEST_LENGTH);
NSData *data = [verifier dataUsingEncoding:NSUTF8StringEncoding];
CC_SHA256([data bytes], (CC_LONG)[data length], buffer);
NSData *hash = [NSData dataWithBytes:buffer length:CC_SHA256_DIGEST_LENGTH];
NSString *challenge = [[[[hash base64EncodedStringWithOptions:0]
                         stringByReplacingOccurrencesOfString:@"+" withString:@"-"]
                        stringByReplacingOccurrencesOfString:@"/" withString:@"_"]
                       stringByTrimmingCharactersInSet:[NSCharacterSet characterSetWithCharactersInString:@"="]];</code></pre>
    </div>
  </div>
</div>

## 3. Get the User's Authorization

To begin an Authorization Code Grant flow, your native application should first send the user to the [authorization URL](/api/authentication#authorization-code-grant-pkce-) including the `code_challenge` and the method used to generate it.

```text
https://${account.namespace}/authorize?
    audience=API_AUDIENCE&
    scope=SCOPE&
    response_type=code&
    client_id=${account.clientId}&
    code_challenge=CODE_CHALLENGE&
    code_challenge_method=S256&
    redirect_uri=${account.callback}
```

Where:

* `audience`: The unique identifier of the API the native app wants to access. Use the value of the __Identifier__ field at your [API Settings](${manage_url}/#/apis). If you can't see this page, enable the __Enable APIs Section__ toggle at [Account Settings > Advanced](${manage_url}/#/account/advanced).

* `scope`: The [scopes](/scopes) that you want to request authorization for. These must be separated by a space. You can request any of the [standard OIDC scopes](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) about users, such as `profile` and `email`, custom claims that must conform to a namespaced format, or any scopes supported by the target API (for example, `read:contacts`). Include `offline_access` to get a refresh token (make sure that the __Allow Offline Access__ field is enabled in the [API Settings](${manage_url}/#/apis)).

  ::: panel-info Custom claims format
  Auth0 returns profile information in a [structured claim format as defined by the OIDC specification](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims). This means that in order to add custom claims to ID tokens or access tokens, they must conform to a namespaced format to avoid possible collisions with standard OIDC claims. For example, if you choose the namespace `https://foo.com/` and you want to add a custom claim named `myclaim`, you would name the claim `https://foo.com/myclaim`, instead of `myclaim`. You can [add namespaced claims using Rules](#optional-customize-the-tokens).
  :::

* `response_type`: Denotes the kind of credential that Auth0 will return (code vs token). For this flow, the value must be `code`.

* `client_id`: Your application's Client ID. You can find this value at your [Client's Settings](${manage_url}/#/clients/${account.clientId}/settings).

* `redirect_uri`: The URL to which Auth0 will redirect the browser after authorization has been granted by the user. The Authorization Code will be available in the `code` URL parameter. This URL must be specified as a valid callback URL under your [Client's Settings](${manage_url}/#/clients/${account.clientId}/settings).

* `code_challenge`: Generated challenge from the `code_verifier`.

* `code_challenge_method`: Method used to generate the challenge.

::: panel-warning A Note About code_challenge_method
The PKCE spec defines two methods, `S256` and `plain`, the former is used in this example and is the **only** one supported by Auth0 since the latter is discouraged.
:::

For example:

```html
<a href="https://${account.namespace}/authorize?scope=appointments%20contacts&audience=appointments:api&response_type=code&client_id=${account.clientId}&code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM&code_challenge_method=S256&redirect_uri=com.myclientapp://myclientapp.com/callback">
  Sign In
</a>
```

## 4. Exchange the Authorization Code for an Access Token

Now that you have an Authorization Code, you must exchange it for an Access Token that can be used to call your API. Using the Authorization Code (`code`) from the previous step, you will need to `POST` to the [Token URL](/api/authentication#authorization-code-pkce-) sending also the `code_verifier`:

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

The response contains `access_token`, `refresh_token`, `id_token`, and `token_type` values, for example:

```js
{
  "access_token": "eyJz93a...k4laUWw",
  "refresh_token": "GEbRxBN...edjnXbL",
  "id_token": "eyJ0XAi...4faeEoQ",
  "token_type": "Bearer"
}
```

Note that `refresh_token` will only be present in the response if you included the `offline_access` scope AND enabled __Allow Offline Access__ for your API in the Dashboard. For more information about Refresh Tokens and how to use them, see [our documentation](/tokens/preview/refresh-token).

::: panel-danger Warning
It is important to understand that the Authorization Code flow with PKCE can only be used for Clients whose type is `Native` in the Dashboard.
:::

## 5. Call the API

Once you have the `access_token`, you can use it to make calls to the API, by passing it as a Bearer Token in the `Authorization` header of the HTTP request:

```har
{
  "method": "GET",
  "url": "https://someapi.com/api",
  "headers": [
    { "name": "Content-Type", "value": "application/json" },
    { "name": "Authorization", "value": "Bearer ACCESS_TOKEN" }
  ]
}
```

## 6. Verify the Token

Once your API receives a request with a Bearer `access_token`, the first thing to do is to validate the token. This consists of a series of steps, and if any of these fails then the request _must_ be rejected.

For details on the validations that should be performed refer to [Verify Access Tokens](/api-auth/tutorials/verify-access-token).

## Optional: Customize the Tokens

<%= include('../../_includes/_api-auth-customize-tokens') %>

If you wish to execute special logic unique to the Authorization Code (PKCE) grant, you can look at the `context.protocol` property in your rule. If the value is `oidc-basic-profile`, then the rule is running during the Authorization Code (PKCE) grant.

## Read more

- [Calling APIs from Mobile Apps](/api-auth/grant/authorization-code-pkce)
- [How to configure an API in Auth0](/apis)
- [Why you should always use access tokens to secure an API](/api-auth/why-use-access-tokens-to-secure-apis)
- [Mobile/Native App Quickstarts](/quickstart/native)
- [Client Authentication for Mobile & Desktop Apps](/client-auth/mobile-desktop)
- [Authentication API: GET /authorize](/api/authentication#authorization-code-grant-pkce-)
- [Authentication API: POST /oauth/token](/api/authentication#authorization-code-pkce-)
- [The OAuth 2.0 protocol](/protocols/oauth2)
- [The OpenID Connect protocol](/protocols/oidc)
- [Tokens used by Auth0](/tokens)
- [RFC 6749 - The OAuth 2.0 Authorization Framework](https://tools.ietf.org/html/rfc6749)
- [RFC 7636 - Proof Key for Code Exchange by OAuth Public Clients](https://tools.ietf.org/html/rfc7636)
