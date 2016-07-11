---
title: Java
---

```java
final JWTVerifier jwtVerifier = new JWTVerifier(new Base64(true).decodeBase64(clientSecret), clientId, issuer);
final Map<String,Object> decodedPayload = jwtVerifier.verify(token);
```
