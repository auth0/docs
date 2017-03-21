---
title: Authentication for Mobile & Desktop Apps
description: Explains how to authenticate users in a mobile or desktop application.
toc: true
---

# Authentication for Mobile & Desktop Apps

You can authenticate users of your mobile/desktop applications by:

* Using the [Lock](/libraries/lock) client libraries;
* Calling the Auth0 OAuth 2.0 endpoints.

This article will cover how to call the Auth0 OAuch 2.0 endpoints using [Proof Key for Code Exchange (PKCE)](/api-auth/grant/authorization-code-pkce) during the authentication process.

## Overview

Auth0 exposes OAuth 2.0 endpoints that you can use to authenticate users. You can call these endpoints through an embedded browser in your **native** application. After authentication completes, you can return an `id_token` that contains the user's profile information.

::: panel-info Auth0 Quickstarts
Please note that, instead of following this tutorial, you can use any of Auth0's client libraries. These encapsulate all the logic required and make it easier for your to implement authentication. Please refer to our [Native Quickstarts](/quickstart/native) to get started with any of these.
:::

## Register Your Client

If you haven't already created a new [Client](/clients) in Auth0, you'll need to do so before implementing your authentication flow. The Auth0 Client maps to your application and allows your application to use Auth0 for authentication purposes.

### Create a New Client

Go to the [Auth0 Dashboard](${manage_url}) and click on [Clients](${manage_url}/#/clients) in the left-hand navigation bar. Click **Create Client**.

The **Create Client** window will open, allowing you to enter the name of your new Client. Choose **Native** as the **Client Type**. When done, click on **Create** to proceed.

::: panel-danger Warning
The Authorization Code flow with PKCE can only be used for Native Clients.
:::

![](/media/articles/client-auth/mobile-desktop/create-client.png)

Once Auth0 creates the Client, navigate to the Client's **Settings** tab to add the following to the **Allowed Callback URLs** field: `https://${account.namespace}/mobile`

Scroll to the bottom of the page and click **Save**.

![](/media/articles/client-auth/mobile-desktop/allowed-callback-url.png)

## Implement Authentication

To implement the Authorization Code Grant Flow using Proof Key for Code Exchange, you will need to execute the following steps:

1. Create a random key (called the **code verifier**) and its transformed value (called the **code challenge**)
2. Obtain the user's authorization
3. Obtain the ID token

Step 1: Create a Random Key and the Code Challenge

You will need to generate and store a `code_verifier`, which is a cryptographically random key that, along with its transformed value (called the `code_challenge`), will be sent to Auth0 for an `authorization_code`.

To generate the `code_verifier`, embed the following into your code:

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

To create the `code_challenge` that accompanies the `code_verifier`, embed the following into your code:

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
md.update(input, 0, input.length);
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

Step 2: Authorize the User

Once you've created the `code_verifier` and the `code_challenge` that you include in the authorization request, you'll need to obtain the user's authorization. This is technically the beginning of the authorization flow, and this step may include one or more of the following processes:

* Authenticating the user;
* Redirecting the user to an Identity Provider to handle authentication;
* Checking for active SSO sessions.

To authorize the user, your application must send the user to the [authorization URL](/api/authentication#authorization-code-grant-pkce-) (which includes the `code_challenge` you generated in the previous step, as well as the method you used to generate the `code_challenge`). Your URL should following this format:

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

Request Parameters:

* `audience`: The unique identifier of the target API. Use the __Identifier__ value in [API Settings](${manage_url}/#/apis). If you don't see this page in the Dashboard, enable the __Enable APIs Section__ toggle at [Account Settings > Advanced](${manage_url}/#/account/advanced).
* `scope`: The [scopes](/scopes) for which you want to request authorization. Each scope must be separated from the others using a whitespace character. You can request any of the [standard OIDC scopes](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) for users (such as `profile` and `email`), custom claims conforming to a namespaced format (see note below on Arbitrary Claims), and any scopes supported by the target API. Include `offline_access` to get a refresh token (make sure that you've enabled __Allow Offline Access__ in your [API Settings](${manage_url}/#/apis)).
* `response_type`: The credential type you want Auth0 to return (code or token). For authentication using PKCE, this value must be set to `code`.
* `client_id`: Your Client's ID. You can find this value in your [Client's Settings](${manage_url}/#/clients/${account.clientId}/settings).
* `redirect_uri`: The URL to which Auth0 will redirect the browser after user authorization. This URL must be specified as a valid callback URL in your [Client's Settings](${manage_url}/#/clients/${account.clientId}/settings).
* `code_challenge`: the generated challenge associated with the `code_verifier`.
* `code_challenge_method`: the method used to generate the challenge. The PKCE spec defines two methods (`S256` and `plain`), but Auth0 only supports `S256`.

::: panel-info Arbitrary Claims
To improve Client application compatibility, Auth0 returns profile information using an [OIDC-defined structured claim format](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims). This means that arbitrary claims to ID or access tokens must conform to a namespaced format to avoid collisions with standard OIDC claims. For example, if your namespace is `https://foo.com/` and you want to add an arbitrary claim named `myclaim`, you would name the claim `https://foo.com/myclaim`, not `myclaim`.
:::

As an example, your HTML snippet for your authorization URL might look as follows:

```html
<a href="https://${account.namespace}/authorize?
  audience=appointments:api&
  scope=appointments%20contacts&
  response_type=code&
  client_id=${account.clientId}&
  code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM&
  code_challenge_method=S256&
  redirect_uri=com.myclientapp://myclientapp.com/callback">
  Sign In
</a>
```

If all goes well, you'll receive an HTTP 302 response:

```text
HTTP/1.1 302 Found
Location: https://YOUR_APP/callback?code=AUTHORIZATION_CODE
```

Note the authorization code included at the end of the included URL.

Step 3: Obtain an ID Token

Using the authorization code obtained in step 2, you can obtain the ID token by making the appropriate `POST` call to the [tokens endpoint](api/authentication#authorization-code-pkce-).

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

Request Parameters:

* `grant_type`: Set this field to `authorization_code`
* `client_id`: Your application's Client ID
* `code_verifier`: The cryptographically random key used to generate the `code_challenge` passed to the `/authorize` endpoint
* `code`: The authorization code received from the initial `authorize` call
* `redirect_uri`: the `redirect_uri` passed to `/authorize` (these two values must match exactly)

If all goes well, you'll receive an HTTP 200 response with the following payload:

```json
{
  "access_token":"eyJz93a...k4laUWw",
  "refresh_token":"GEbRxBN...edjnXbL",
  "id_token":"eyJ0XAi...4faeEoQ",
  "token_type":"Bearer",
  "expires_in":86400
}
```

Note that Auth0 includes the `refresh_token` only if you've:

* Included the `offline_access` scope in your initial call to the `authorize` endpoint;
* Enabled **Allow Offline Access** for your API in the using the [API Settings tab](${manage_url}/#/apis) in the Auth0 Dashboard.

### The `id_token`

Auth0's `id_token` is a [JSON Web Token (JWT)](/jwt) of type **Bearer** containing information about the user. You will need to decode this token to read the claims (or attributes) of the user. The JWT website provides a [list of libraries you can use to decode](https://jwt.io/#libraries-io) the `id_token`.

If you would like additional information on JWTs, please visit our section on [JWT section](/jwt).

Once you've decoded the JWT, you can extract user information from the `id_token` payload. The JSON payload contains the user claims (attributes), as well as metadata.

#### The `id_token` Payload

Your `id_token` payload will look something like this:

```json
{
  "name": "John Smith",
  "email": "jsmith@example.com",
  "picture": "https://example.com/profile-pic.png",
  "iss": "https://auth0user.auth0.com/",
  "sub": "auth0|581...",
  "aud": "xvt...",
  "exp": 1478113129,
  "iat": 1478077129
}
```

::: panel-info Debugging a JWT
The [JWT.io website](https://jwt.io) has a debugger that allows you to debug any JSON Web Token. This is useful if you want to quckly decode a JWT to see the information it contains.
:::

The payload's claims can include some or all of the following:

| Parameter | Description |
|:------------------|:---------|
| name | The name of the user which is returned from the Identity Provider. |
| email | The email address of the user which is returned from the Identity Provider. |
| picture | The profile picture of the user which is returned from the Identity Provider. |
| sub | The unique identifier of the user. This is guaranteed to be unique per user and will be in the format (identity provider)&#124;(unique id in the provider), e.g. github&#124;1234567890. |
| iss | The _issuer_. A case-sensitive string or URI that uniquely identiﬁes the party that issued the JWT. For an Auth0 issued `id_token`, this will be **the URL of your Auth0 tenant**.<br/><br/>**This is a [registered claim](https://tools.ietf.org/html/rfc7519#section-4.1) according to the JWT Specification** |
| aud | The _audience_. Either a single case-sensitive string or URI or an array of such values that uniquely identify the intended recipients of this JWT. For an Auth0 issued `id_token`, this will be the **Client ID of your Auth0 Client**.<br/><br/>**This is a [registered claim](https://tools.ietf.org/html/rfc7519#section-4.1) according to the JWT Specification** |
| exp | The _expiration time_. A number representing a speciﬁc date and time in the format “seconds since epoch” as [deﬁned by POSIX6](https://en.wikipedia.org/wiki/Unix_time). This claim sets the exact moment from which this **JWT is considered invalid**.<br/><br/>**This is a [registered claim](https://tools.ietf.org/html/rfc7519#section-4.1) according to the JWT Specification** |
| iat | The _issued at time_. A number representing a speciﬁc date and time (in the same format as `exp`) at which this **JWT was issued**.<br/><br/>**This is a [registered claim](https://tools.ietf.org/html/rfc7519#section-4.1) according to the JWT Specification** |

The exact claims contained in the `id_token` will depend on the `scope` parameter you sent to the `/authorize` endpoint. An Auth0 `id_token` will always include the **registered claims** and the `sub` claim, but the others depends on the `scope`.

### Keep the User Logged In

Auth0 assists in authenticating a user, but your application must keep track of whether or not a user is logged in. You can keep a global variable or a singleton object inside your application to do this. You can also use this object to store information about the user (such as name and profile image) so that you can deliver a personalized user experience within your application.

## Example Use Cases

This section covers use cases that illustrate the authentication process using PKCE.

### Basic Authentication Request

This is the most basic request you can make to the `/authorize` endpoint. The user sees the Lock screen and can sign in with any configured Connection.

The initial authorization URL is as follows:

```text
https://${account.namespace}/authorize?
    response_type=code&
    client_id=${account.clientId}&
    code_challenge=CODE_CHALLENGE&
    code_challenge_method=S256&
    redirect_uri=${account.callback}
```
