---
name: web.xml
language: 
---
    
```
<context-param>
    <param-name>com.auth0.domain</param-name>
    <param-value>${account.namespace}</param-value>
</context-param>

<context-param>
    <param-name>com.auth0.clientId</param-name>
    <param-value>${account.clientId}</param-value>
</context-param>

<context-param>
    <param-name>com.auth0.clientSecret</param-name>
    <param-value>${account.clientSecret}</param-value>
</context-param>
```
