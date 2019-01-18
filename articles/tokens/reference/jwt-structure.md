## What is the JSON Web Token structure?

JSON Web Tokens consist of three Base64-encoded strings separated by dots (`.`), which can easily be passed in HTML and HTTP environments and are more compact than XML-based standards like SAML. These strings include:

- Header
- Payload
- Signature

Therefore, a JWT typically looks like the following:
![Encoded JWT](/media/articles/jwt/encoded-jwt3.png)


### Header

The header *typically* consists of two parts: the type of the token (JWT) and the hashing algorithm being used (e.g., HMAC SHA256 or RSA):

```
{
  "alg": "HS256",
  "typ": "JWT"
}
```


### Payload

The payload contains statements about the entity (typically, the user) and additional data, which are called claims:

```
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```

When working with [JWT claims](https://tools.ietf.org/html/rfc7519#section-4), you should be aware of [naming rules]. 



### Signature

To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that.

For example if you want to use the HMAC SHA256 algorithm, the signature will be created in the following way:

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

The signature is used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way.

## Practice
To play with JWT and put these concepts into practice, you can use [jwt.io Debugger](http://jwt.io) to decode, verify, and generate JWTs.

![JWT.IO Debugger](/media/articles/jwt/legacy-app-auth-5.png)
