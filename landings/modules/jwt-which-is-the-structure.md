---
public: false
budicon: 546
color: "#EB5424"
title: "Which is the JSON Web Token structure?"
---

JWTs consist of three parts separated by dots (`.`), which are:

- **Header**
- **Payload**
- **Signature** 

Therefore, a JWT typically looks like the following.

`xxxxx.yyyyy.zzzzz`

Let's break down the different parts.

### Header

The header *typically* consists of two parts: the type of the token, which is JWT, and the hashing algorithm such as HMAC SHA256 or RSA.

For example:

```JavaScript
{
  "alg": "HS256",
  "typ": "JWT"
}

```

Then, this JSON is **Base64Url** encoded to form the first part of the JWT.

### Payload

The second part of the token is the payload, which contains the claims. Claims are statements about an entity (typically, the user) and additional metadata. 
There are three types of claims: *reserved*, *public*, and *private* claims.

- **Reserved claims**: These are a set of predefined claims, which are not mandatory but recommended, thought to provide a set of useful, interoperable claims. Some of them are: **iss** (issuer), **exp** (expiration time), **sub** (subject), **aud** (audience), among others.

	> Notice that the claim names are only three characters long as JWT is meant to be compact.

- **Public claims**: These can be defined at will by those using JWTs. But to avoid collisions they should be defined in the IANA JSON Web Token Registry or be defined as a URI that contains a collision resistant namespace.

- **Private claims**: These are the custom claims created to share information between parties that agree on using them.

An example of payload could be:

```JavaScript
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}

```

The payload is then **Base64Url** encoded to form the second part of the JWT.

### Signature
To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that.

For example if you want to use the HMAC SHA256 algorithm, the signature will be created in the following way.

```JavaScript
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

The signature is used to verify that the sender of the JWT is who it says it is and to ensure that the message was't changed in the way.

### Putting all together

The output is three Base64 strings separated by dots that can be easily passed in HTML and HTTP environments, while being more compact compared to XML-based standards such as SAML.

The following shows a JWT that has the previous header and payload encoded and it is signed with a secret.

![An encoded JWT](https://cdn.auth0.com/content/jwt/encoded-jwt4.png)

You can browse to [jwt.io](http://jwt.io) where you can play with a JWT and put these concepts in practice. [jwt.io](http://jwt.io) allows you to decode, verify and generate JWT.