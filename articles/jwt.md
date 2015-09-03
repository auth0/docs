# JsonWebTokens in Auth0

> For more information on all the types of access tokens used by Auth0, see [Tokens](/tokens).

## Standard JWT

Application programs or Web APIs can invoke Auth0's authentication sequences in a few different ways, such as via the Lock widget or calling a library for the language in which their program is written. Each of these mechanisms allows the calling program to specify a `scope` parameter which can be used to request the return of an `access_token` and, optionally, an id_token.

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

If the `scope` in the authorization request is set to `scope=openid profile`, then all the properties of the [user profile](/user-profile) are added to the Body. You can also define specific attributes with the syntax: `scope: 'openid {attr1} {attr2} {attrN}'`. For example: `scope: 'openid name email picture'`.

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
