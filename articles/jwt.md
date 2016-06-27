# JSON Web Tokens (JWT) in Auth0

> For more information on all the types of access tokens used by Auth0, see [Tokens](/tokens).

## Standard JWT

Application programs or Web APIs can invoke Auth0's authentication sequences in a few different ways, such as via the Lock widget or calling a library for the language in which their program is written. Each of these mechanisms allows the calling program to [specify a `scope` parameter](/scopes) which can be used to request the return of an `access_token` and, optionally, an `id_token`.

When using the `scope=openid`, Auth0 will generate both an `access_token` and an `id_token`.   The `access_token` is just an opaque value that can be sent in subsequent API calls to Auth0. The `id_token` is a JSON Web Token, (abbreviated JWT), and is a rich data structure with two characteristics:

1. It contains properties about the logged in user, your Auth0 account and the app.
2. It is digitally signed to prevent tampering.

> Want to learn more about JWT? Take a look at the draft spec [here](http://self-issued.info/docs/draft-ietf-oauth-json-web-token.html). JWT adoption is increasing with the support of companies like Google, Microsoft, etc.

A JWT consists of 3 segments:

### 1. Header
```javascript
{
	typ: 'JWT',
	alg: 'HS256'
}
```
### 2. Body
The minimum information will be:

```javascript
{
    iss: "https://${account.namespace}",
    sub: "{connection}|{user_id}",
    aud: "${account.clientId}",
    exp: 1372674336,
    iat: 1372638336
}
```

* `iss` the __issuer__ which corresponds to your instance of Auth0.
* `sub` the __subject__, is a string formed by the `connection` used to authenticate the user (e.g. google-oauth2, linkedin, etc). and the unique id of the logged in user in that identity provider.
* `aud` the __audience__, always set to your application __Client ID__ in Auth0.
* `exp` the __expiration__, set to 10 hours.
* `iat` the __issued at timestamp__.

You can define specific attributes with the syntax: `scope: 'openid {attr1} {attr2} {attrN}'` which will add those properties of the [user profile](/user-profile) to the Body. For example: `scope: 'openid name email picture'`. More information about scopes can be found in the [Scopes documentation](/scopes).

> __Beware!__ If you are using the `implicit flow`, as you would if you are issuing the authorization request from a device, the JWT is returned in the URL, not in the response body. Some browsers have restrictions on URL lengths and can give you unexpected results.

### 3. Signature
The signature is computed as:

```javascript
function sign(input, key, method) {
  var base64str = crypto.createHmac(method, key).update(input).digest('base64');
  return base64urlEscape(base64str);
}
```
Where:

* `input` is the combined `Header` and `Body`, _JSON.stringified_ and base64 encoded, concatenated with a ".".
* `key` is your account `clientSecret`, for the application.
* `method` is always [`sha256`](https://en.wikipedia.org/wiki/SHA-2).

---

## Signing Algorithms

A JWT is usually complemented with a signature or encryption. These are handled in their own specs as [JSON Web Signature (JWS)](https://tools.ietf.org/html/rfc7515) and [JSON Web Encryption (JWE)](https://tools.ietf.org/html/rfc7516). A signature allows a JWT to be validated against modifications. Encryption, on the other hand, makes sure the content of the JWT is only readable by certain parties.

The most common JWT signing algorithms are:
- HMAC + SHA256
- RSASSA-PKCS1-v1_5 + SHA256
- ECDSA + P-256 + SHA256

Hash-Based Message Authentication Codes (HMACs) are a group of algorithms that provide a way of signing messages by means of a shared key. They are probably the most common algorithms for signed JWTs. HMACs are used with JWTs when you want a simple way for all parties to create and validate JWTs. Any party knowing the key can create new JWTs. In other words, with shared keys, it is possible for party to impersonate another one: HMAC JWTs do not provide guarantees with regards to the creator of the JWT. Anyone knowing the key can create one. For certain use cases, this is too permissive. This is where asymmetric algorithms come into play.

Both RSA and ECDSA are asymmetric encryption and digital signature algorithms. What asymmetric algorithms bring to the table is the possibility of verifying or decrypting a message without being able to create a new one. The main difference between RSA and ECDSA lies in speed and key size. ECDSA requires smaller keys to achieve the same level of security as RSA. This makes it a great choice for small JWTs. RSA, however, is usually faster than ECDSA.

You can read more on these algorithms [here](https://auth0.com/blog/2015/12/17/json-web-token-signing-algorithms-overview/).

At Auth0 we rely heavily on the fetures of JWTs. All of our APIs handle authentication and authorization through JWTs. For instance, our Lock library returns a JWT that you can store client side and use for future requests to your own APIs. Thanks to JWS and JWE, the contents of the client-side JWTs are safe.

You can set the JWT Signature Algorithm you want to use for your app using the [Management Dashboard](${uiURL}/#/). Navigate to your application and click on _Settings > Show Advanced Settings > OAuth_. The _JsonWebToken Signature Algorithm_ field offers two choices:
- `HS256`: JWT will be signed with your client secret.
- `RS256`: JWT will be signed with your private signing key and they can be verified using your public signing key. 

![](/media/articles/jwt/signing-alg.png)

If you choose `RS256`, you can download the certificate at the _Certificates_ tab. Furthermore, if you click on _Endpoints_ instead of _Certificates_, the _JSON Web Key Set_ field gives you a public URL where clients can self-discover the public credentials.

![](/media/articles/jwt/endpoints.png)

---

## Decoding JWT

There are several libraries available to you if you need to decode JWTs. Any library listed [here](https://tehsis.github.io/webtaskio-canirequire/) would do. For example, you could try the [node-jsonwebtoken library](https://github.com/auth0/node-jsonwebtoken), a JWT implementation for node.js.

---

## When using Microsoft Azure Mobile Services

Microsoft Azure Mobile Services (WAMS) APIs expects a specific format of JWTs. WAMS compatible JWT have an additional property in the body:

	uid: "{connection}|{user_id}"

`uid` is mapped to the `user_id` (which is the `sub` property in the standard JWT). On the server side of WAMS, this claim is mapped to `user.userId` and can be used to drive authorization:

```javascript
function read(query, user, request) {
    if (user && user.userId) {
    	query.where({ owner: user.userId });
    }
    request.execute();
}
```

The signature also changes. JWT for WAMS are computed with a different secret:

```javascript
var secret = crypto.createHash('sha256').update(masterkey + "JWTSig").digest('base64');
```

Where `masterkey` is your WAMS masterkey:

![](/media/articles/jwt/3ruy9.png)
