---
title: Java
---

```java
final JwtVerifier jwtVerifier = new JwtVerifier("${'<%= api.signing_secret %>'}", "${'<%= api.identifier %>'}", "${'https://<%= tenantDomain %>'}/");
final Map<String,Object> decodedPayload = jwtVerifier.verify(token);
```
