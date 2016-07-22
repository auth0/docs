---
title: Java
---

```java
final String issuer = "${'https://<%= tenantDomain %>'}/";
final String audience = "${'<%= api.identifier %>'}";
final String secret = "${'<%= api.signing_secret %>'}";

final JWTVerifier jwtVerifier = new JWTVerifier(secret, audience, issuer);

final Map<String,Object> decodedPayload = jwtVerifier.verify(token);
```
