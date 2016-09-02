```xml
<context-param>
    <param-name>auth0.domain</param-name>
    <param-value>${account.namespace}</param-value>
</context-param>

<context-param>
    <param-name>auth0.issuer</param-name>
    <param-value>{ISSUER}</param-value>
</context-param>

<context-param>
    <param-name>auth0.client_id</param-name>
    <param-value>${account.clientId}</param-value>
</context-param>

<context-param>
    <param-name>auth0.signing_algorithm</param-name>
    <param-value>HS256</param-value>
    <!--<param-value>RS256</param-value>-->
</context-param>

<context-param>
    <param-name>auth0.client_secret</param-name>
    <param-value>${account.clientSecret}</param-value>
</context-param>
```
