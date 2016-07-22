---
title: Java
---

```java
final PublicKey publicKey = readPublicKey(PEM_FILENAME);
final JwtVerifier jwtVerifier = new JwtVerifier(publicKey);
final Map<String, Object> verifiedClaims = jwtVerifier.verify(token);
```
