---
name: web.xml
language: xml
---

```xml
<env-entry>
    <env-entry-name>auth0.domain</env-entry-name>
    <env-entry-type>java.lang.String</env-entry-type>
    <env-entry-value>${account.namespace}</env-entry-value>
</env-entry>
<env-entry>
    <env-entry-name>auth0.clientId</env-entry-name>
    <env-entry-type>java.lang.String</env-entry-type>
    <env-entry-value>${account.clientId}</env-entry-value>
</env-entry>
<env-entry>
    <env-entry-name>auth0.clientSecret</env-entry-name>
    <env-entry-type>java.lang.String</env-entry-type>
    <env-entry-value>YOUR_CLIENT_SECRET</env-entry-value>
</env-entry>
<env-entry>
    <env-entry-name>auth0.scope</env-entry-name>
    <env-entry-type>java.lang.String</env-entry-type>
    <env-entry-value>openid profile email</env-entry-value>
</env-entry>
```