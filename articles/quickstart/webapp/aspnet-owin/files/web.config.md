---
name: Web.config
language: xml
---

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <appSettings>
    <add key="auth0:Domain" value="${account.namespace}" />
    <add key="auth0:ClientId" value="${account.clientId}" />
  </appSettings>
</configuration>
```